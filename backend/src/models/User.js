const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    },
    referralCode: {
      type: String,
      unique: true,
      default: () => 'referral' + Math.floor(100 + Math.random() * 900),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
