const mongoose = require('mongoose');
const Competition = require('../models/Competition');
const Registration = require('../models/Registration');
const Submission = require('../models/Submission');
const User = require('../models/User');

const isValidId = (value) => mongoose.isValidObjectId(value);
const isHttpUrl = (value) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

// Get competition details with dynamic user state and lifecycle.
const getCompetitionDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (userId && !isValidId(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid userId' });
    }

    const competition =
      !id || id === 'default' || id === 'latest'
        ? await Competition.findOne().sort({ createdAt: -1 })
        : isValidId(id)
          ? await Competition.findById(id)
          : null;

    if (!competition) {
      return res.status(id && id !== 'default' && id !== 'latest' ? 400 : 404).json({
        success: false,
        message: id && id !== 'default' && id !== 'latest' ? 'Invalid competition id' : 'Competition not found',
      });
    }

    const currentState = competition.getCurrentState();
    let userState = { isRegistered: false, hasSubmitted: false, registration: null, submission: null };

    // User IDs are not authentication. Never expose registration/payment details or submitted video data through this public endpoint in production.
    if (userId && process.env.NODE_ENV !== 'production') {
      const registration = await Registration.findOne({ userId, competitionId: competition._id });
      if (registration) {
        userState.isRegistered = true;
        userState.registration = registration;
        const submission = await Submission.findOne({ userId, competitionId: competition._id });
        if (submission) {
          userState.hasSubmitted = true;
          userState.submission = submission;
        }
      }
    }

    const now = new Date();
    const spotsRemaining = Math.max(0, competition.maxSpots - competition.bookedSpots);

    return res.status(200).json({
      success: true,
      data: {
        competition,
        computed: {
          currentState,
          spotsRemaining,
          isRegistrationFull: spotsRemaining === 0,
          millisUntilRegistrationCloses: Math.max(0, new Date(competition.registrationDeadline) - now),
          userState,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching competition details:', error);
    return res.status(500).json({ success: false, message: 'Unable to fetch competition details' });
  }
};

// Reserve a spot without allowing overbooking. Registration creation is compensated
// if the second database write fails; use a MongoDB replica-set transaction for
// full crash-safe atomicity in production.
const registerForCompetition = async (req, res) => {
  let reservedCompetitionId = null;
  try {
    const { id } = req.params;
    const { userId } = req.body || {};

    if (process.env.NODE_ENV === 'production') {
      return res.status(503).json({ success: false, message: 'Verified payment processing is not configured. Registration is disabled in production.' });
    }
    if (!isValidId(id) || !isValidId(userId)) {
      return res.status(400).json({ success: false, message: 'Valid competition id and userId are required' });
    }

    const [competition, user] = await Promise.all([
      Competition.findById(id),
      User.findById(userId),
    ]);
    if (!competition) return res.status(404).json({ success: false, message: 'Competition not found' });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const state = competition.getCurrentState();
    if (state !== 'REGISTRATION_OPEN') {
      return res.status(409).json({
        success: false,
        message: `Registration is not open (current state: ${state})`,
      });
    }

    const existing = await Registration.findOne({ userId, competitionId: competition._id });
    if (existing) {
      return res.status(409).json({ success: false, message: 'You are already registered' });
    }

    const now = new Date();
    const reservationFilter = {
      _id: competition._id,
      $expr: { $lt: ['$bookedSpots', '$maxSpots'] },
      $or: [
        { statusOverride: 'REGISTRATION_OPEN' },
        {
          statusOverride: 'AUTO',
          registrationDeadline: { $gt: now },
        },
      ],
    };
    const updated = await Competition.findOneAndUpdate(
      reservationFilter,
      { $inc: { bookedSpots: 1 } },
      { new: true }
    );

    if (!updated) {
      return res.status(409).json({
        success: false,
        message: 'Registration has closed or all spots have been booked.',
      });
    }
    reservedCompetitionId = updated._id;

    // This assignment uses a simulated payment flow. Do not treat this as a
    // verified real payment; production registration must follow gateway verification.
    const registration = await Registration.create({
      userId,
      competitionId: updated._id,
      amountPaid: updated.entryFee,
      // Demo-only payment simulation. Production registrations are blocked above
      // until real gateway verification is implemented.
      paymentStatus: 'PAID',
    });

    return res.status(201).json({
      success: true,
      message: 'Demo registration successful. Payment is simulated.',
      data: {
        registration,
        bookedSpots: updated.bookedSpots,
        spotsRemaining: Math.max(0, updated.maxSpots - updated.bookedSpots),
      },
    });
  } catch (error) {
    if (reservedCompetitionId) {
      try {
        await Competition.updateOne({ _id: reservedCompetitionId, bookedSpots: { $gt: 0 } }, { $inc: { bookedSpots: -1 } });
      } catch (rollbackError) {
        console.error('Failed to release reserved spot:', rollbackError);
      }
    }
    if (error && error.code === 11000) {
      return res.status(409).json({ success: false, message: 'You are already registered for this competition' });
    }
    console.error('Error during registration:', error);
    return res.status(500).json({ success: false, message: 'Registration could not be completed' });
  }
};

// Submit an entry only during the valid submission window and for a paid registration.
const submitEntry = async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(503).json({ success: false, message: 'Submissions are disabled in production until authentication and verified payment checks are configured.' });
  }

  try {
    const { id } = req.params;
    const { userId, title, danceStyle, videoUrl, description } = req.body || {};

    if (!isValidId(id) || !isValidId(userId)) {
      return res.status(400).json({ success: false, message: 'Valid competition id and userId are required' });
    }
    if (typeof title !== 'string' || !title.trim() || title.trim().length > 120) {
      return res.status(400).json({ success: false, message: 'Title is required and must be 120 characters or fewer' });
    }
    if (typeof videoUrl !== 'string' || !isHttpUrl(videoUrl)) {
      return res.status(400).json({ success: false, message: 'A valid HTTP(S) videoUrl is required' });
    }
    if (danceStyle != null && (typeof danceStyle !== 'string' || danceStyle.trim().length > 80)) {
      return res.status(400).json({ success: false, message: 'danceStyle must be 80 characters or fewer' });
    }
    if (description != null && (typeof description !== 'string' || description.trim().length > 2000)) {
      return res.status(400).json({ success: false, message: 'description must be 2000 characters or fewer' });
    }

    const competition = await Competition.findById(id);
    if (!competition) return res.status(404).json({ success: false, message: 'Competition not found' });

    const state = competition.getCurrentState();
    const now = new Date();
    const withinSubmissionWindow =
      state === 'SUBMISSIONS_OPEN' &&
      (competition.statusOverride === 'SUBMISSIONS_OPEN' ||
        (now >= new Date(competition.submissionStartDate) && now <= new Date(competition.submissionEndDate)));
    if (!withinSubmissionWindow) {
      return res.status(409).json({
        success: false,
        message: `Submissions are not open (current state: ${state})`,
      });
    }

    const registration = await Registration.findOne({ userId, competitionId: id });
    if (!registration || registration.paymentStatus !== 'PAID') {
      return res.status(403).json({
        success: false,
        message: 'Only participants with a verified paid registration can submit an entry.',
      });
    }

    const submission = await Submission.findOneAndUpdate(
      { userId, competitionId: id },
      {
        title: title.trim(),
        danceStyle: typeof danceStyle === 'string' && danceStyle.trim() ? danceStyle.trim() : 'Classical Dance',
        videoUrl: videoUrl.trim(),
        description: (description || '').trim(),
        submittedAt: now,
        status: 'SUBMITTED',
      },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Submission uploaded successfully!',
      data: submission,
    });
  } catch (error) {
    console.error('Error during submission upload:', error);
    return res.status(500).json({ success: false, message: 'Submission could not be saved' });
  }
};

const getDemoUsers = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    const users = await User.find().select('-password -passwordHash');
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to fetch users' });
  }
};

// These evaluator controls are intended only for local demos, never production.
const updateLifecycleOverride = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production' || process.env.ENABLE_DEMO_CONTROLS === 'false') {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    const { id } = req.params;
    const { statusOverride } = req.body || {};
    const allowed = ['AUTO', 'REGISTRATION_OPEN', 'REGISTRATION_CLOSED', 'SUBMISSIONS_OPEN', 'SUBMISSIONS_CLOSED', 'COMPLETED'];
    if (!isValidId(id) || !allowed.includes(statusOverride)) {
      return res.status(400).json({ success: false, message: 'Valid competition id and statusOverride are required' });
    }
    const competition = await Competition.findByIdAndUpdate(id, { statusOverride }, { new: true, runValidators: true });
    if (!competition) return res.status(404).json({ success: false, message: 'Competition not found' });
    return res.status(200).json({ success: true, message: `State overridden to: ${statusOverride}`, data: competition });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to update lifecycle state' });
  }
};

const resetDemoState = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production' || process.env.ENABLE_DEMO_CONTROLS === 'false') {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    const competition = await Competition.findOne().sort({ createdAt: -1 });
    if (!competition) return res.status(404).json({ success: false, message: 'No competition to reset' });

    const users = await User.find().sort({ createdAt: 1 }).select('_id');
    if (users.length > 1) {
      const nonDefaultIds = users.slice(1).map((user) => user._id);
      await Promise.all([
        Registration.deleteMany({ userId: { $in: nonDefaultIds }, competitionId: competition._id }),
        Submission.deleteMany({ userId: { $in: nonDefaultIds }, competitionId: competition._id }),
      ]);
    }
    const actualRegistrations = await Registration.countDocuments({ competitionId: competition._id });
    competition.bookedSpots = Math.min(competition.maxSpots, actualRegistrations);
    competition.statusOverride = 'AUTO';
    await competition.save();

    return res.status(200).json({
      success: true,
      message: 'Demo state reset successfully',
      data: { bookedSpots: competition.bookedSpots, spotsRemaining: Math.max(0, competition.maxSpots - competition.bookedSpots) },
    });
  } catch (error) {
    console.error('Error resetting demo state:', error);
    return res.status(500).json({ success: false, message: 'Unable to reset demo state' });
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
