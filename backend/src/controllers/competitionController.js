const Competition = require('../models/Competition');
const Registration = require('../models/Registration');
const Submission = require('../models/Submission');
const User = require('../models/User');

// Get Competition Details with dynamic user state and lifecycle
const getCompetitionDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    let competition;
    if (!id || id === 'default' || id === 'latest') {
      competition = await Competition.findOne().sort({ createdAt: -1 });
    } else {
      competition = await Competition.findById(id);
    }

    if (!competition) {
      return res.status(404).json({ success: false, message: 'Competition not found' });
    }

    // Determine lifecycle state
    const currentState = competition.getCurrentState();

    // Check user registration and submission status
    let userState = {
      isRegistered: false,
      hasSubmitted: false,
      registration: null,
      submission: null,
    };

    if (userId) {
      const registration = await Registration.findOne({
        userId,
        competitionId: competition._id,
      });

      if (registration) {
        userState.isRegistered = true;
        userState.registration = registration;

        const submission = await Submission.findOne({
          userId,
          competitionId: competition._id,
        });

        if (submission) {
          userState.hasSubmitted = true;
          userState.submission = submission;
        }
      }
    }

    // Time calculations
    const now = new Date();
    const millisUntilRegistrationCloses = Math.max(0, new Date(competition.registrationDeadline) - now);
    const spotsRemaining = Math.max(0, competition.maxSpots - competition.bookedSpots);
    const isRegistrationFull = spotsRemaining <= 0;

    return res.status(200).json({
      success: true,
      data: {
        competition,
        computed: {
          currentState,
          spotsRemaining,
          isRegistrationFull,
          millisUntilRegistrationCloses,
          userState,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching competition details:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Concurrency-safe Registration handler
const registerForCompetition = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId is required' });
    }

    const competition = await Competition.findById(id);
    if (!competition) {
      return res.status(404).json({ success: false, message: 'Competition not found' });
    }

    // Check if registration is still open
    const currentState = competition.getCurrentState();
    if (currentState !== 'REGISTRATION_OPEN') {
      return res.status(400).json({
        success: false,
        message: `Registration is not open for this competition (Current state: ${currentState})`,
      });
    }

    // Check if user already registered
    const existingRegistration = await Registration.findOne({
      userId,
      competitionId: competition._id,
    });

    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        message: 'You are already registered for this competition',
        data: existingRegistration,
      });
    }

    // ATOMIC RESERVATION TO PREVENT RACE CONDITIONS
    // Only increment bookedSpots if bookedSpots < maxSpots
    const updatedComp = await Competition.findOneAndUpdate(
      {
        _id: competition._id,
        $expr: { $lt: ['$bookedSpots', '$maxSpots'] },
      },
      {
        $inc: { bookedSpots: 1 },
      },
      { new: true }
    );

    if (!updatedComp) {
      return res.status(409).json({
        success: false,
        message: 'Sorry! All spots were just booked by other participants.',
      });
    }

    // Create the registration record
    const registration = await Registration.create({
      userId,
      competitionId: competition._id,
      amountPaid: competition.entryFee,
      paymentStatus: 'PAID',
    });

    return res.status(201).json({
      success: true,
      message: 'Registration successful! Spot reserved.',
      data: {
        registration,
        bookedSpots: updatedComp.bookedSpots,
        spotsRemaining: updatedComp.maxSpots - updatedComp.bookedSpots,
      },
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Submission Handler
const submitEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, title, danceStyle, videoUrl, description } = req.body;

    if (!userId || !title || !videoUrl) {
      return res.status(400).json({
        success: false,
        message: 'userId, title, and videoUrl are required',
      });
    }

    // Check if user is registered
    const registration = await Registration.findOne({
      userId,
      competitionId: id,
    });

    if (!registration) {
      return res.status(403).json({
        success: false,
        message: 'Only registered participants can submit an entry.',
      });
    }

    const submission = await Submission.findOneAndUpdate(
      { userId, competitionId: id },
      {
        title,
        danceStyle: danceStyle || 'Classical Dance',
        videoUrl,
        description: description || '',
        submittedAt: new Date(),
        status: 'SUBMITTED',
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Submission uploaded successfully!',
      data: submission,
    });
  } catch (error) {
    console.error('Error during submission upload:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get Users
const getDemoUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Switch lifecycle state for evaluator testing
const updateLifecycleOverride = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusOverride } = req.body;

    const competition = await Competition.findByIdAndUpdate(
      id,
      { statusOverride },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `State overridden to: ${statusOverride}`,
      data: competition,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Reset demo competition state
const resetDemoState = async (req, res) => {
  try {
    const competition = await Competition.findOne();
    if (!competition) {
      return res.status(404).json({ success: false, message: 'No competition to reset' });
    }

    // Keep 1 spot booked as per design
    competition.bookedSpots = 1;
    competition.statusOverride = 'AUTO';
    await competition.save();

    // Clear registrations and submissions for non-default users
    const users = await User.find();
    if (users.length > 1) {
      await Registration.deleteMany({ userId: { $ne: users[0]._id } });
      await Submission.deleteMany({ userId: { $ne: users[0]._id } });
    }

    return res.status(200).json({
      success: true,
      message: 'Demo state reset successfully!',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCompetitionDetails,
  registerForCompetition,
  submitEntry,
  getDemoUsers,
  updateLifecycleOverride,
  resetDemoState,
};
