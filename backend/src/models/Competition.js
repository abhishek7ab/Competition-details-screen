const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    titleHindi: {
      type: String,
      default: 'फीडएंट्स क्लासिकल डांस',
    },
    category: {
      type: String,
      default: 'Dance',
    },
    tags: {
      type: [String],
      default: ['Dance', 'Multi-Win'],
    },
    badgeText: {
      type: String,
      default: 'Winners get certificate',
    },
    badgeTextHindi: {
      type: String,
      default: 'विजेताओं को प्रमाणपत्र मिलेगा',
    },
    prizePool: {
      type: Number,
      required: true,
      default: 1500,
    },
    entryFee: {
      type: Number,
      required: true,
      default: 99,
    },
    maxSpots: {
      type: Number,
      required: true,
      default: 20,
    },
    bookedSpots: {
      type: Number,
      default: 1,
      min: 0,
    },
    judge: {
      name: { type: String, default: 'Manju Dubey' },
      role: { type: String, default: 'Professional Kathak Dancer' },
      experience: { type: String, default: '12+ Years of Experience' },
      avatarUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      },
      introVideoUrl: {
        type: String,
        default: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
    },
    registrationDeadline: {
      type: Date,
      required: true,
    },
    submissionStartDate: {
      type: Date,
      required: true,
    },
    submissionEndDate: {
      type: Date,
      required: true,
    },
    resultDate: {
      type: Date,
      required: true,
    },
    previousWinners: [
      {
        name: { type: String, required: true },
        rankTitle: { type: String, required: true },
        avatarUrl: { type: String, required: true },
        videoUrl: { type: String, default: '' },
      },
    ],
    aboutText: {
      en: {
        type: String,
        default:
          'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance. Participants will be judged based on rhythm, expressions (Bhava), hand gestures (Mudra), and overall choreography by our eminent jury.',
      },
      hi: {
        type: String,
        default:
          'यह सभी आयु वर्ग के लिए एक ऑनलाइन शास्त्रीय नृत्य प्रतियोगिता है। कहीं से भी भाग लें और अपनी प्रतिभा का प्रदर्शन करें। पारंपरिक नृत्य के माध्यम से अपनी कला व्यक्त करें।',
      },
    },
    judgingParameters: [
      {
        parameter: { type: String, required: true },
        parameterHindi: { type: String },
        weightage: { type: String, required: true },
        description: { type: String },
      },
    ],
    rulesAndEligibility: [
      {
        rule: { type: String, required: true },
        ruleHindi: { type: String },
      },
    ],
    rewards: [
      {
        rank: { type: Number, required: true },
        title: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    disclaimer: {
      en: {
        type: String,
        default: 'Only contributions from paid participants will be considered for judging.',
      },
      hi: {
        type: String,
        default: 'केवल सशुल्क प्रतिभागियों के योगदान को ही निर्णय के लिए मान्य माना जाएगा।',
      },
    },
    referralBonus: {
      type: Number,
      default: 10,
    },
    statusOverride: {
      type: String,
      enum: ['AUTO', 'REGISTRATION_OPEN', 'REGISTRATION_CLOSED', 'SUBMISSIONS_OPEN', 'SUBMISSIONS_CLOSED', 'COMPLETED'],
      default: 'AUTO',
    },
  },
  { timestamps: true }
);

// Virtual for remaining spots
competitionSchema.virtual('remainingSpots').get(function () {
  return Math.max(0, this.maxSpots - this.bookedSpots);
});

// Dynamic lifecycle state computation based on dates and spots
competitionSchema.methods.getCurrentState = function () {
  if (this.statusOverride && this.statusOverride !== 'AUTO') {
    return this.statusOverride;
  }
  const now = new Date();
  if (now > this.resultDate) {
    return 'COMPLETED';
  }
  if (now > this.submissionEndDate) {
    return 'SUBMISSIONS_CLOSED';
  }
  if (now > this.registrationDeadline || this.bookedSpots >= this.maxSpots) {
    if (now >= this.submissionStartDate && now <= this.submissionEndDate) {
      return 'SUBMISSIONS_OPEN';
    }
    return 'REGISTRATION_CLOSED';
  }
  // Registration is open!
  return 'REGISTRATION_OPEN';
};

competitionSchema.set('toJSON', { virtuals: true });
competitionSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Competition', competitionSchema);
