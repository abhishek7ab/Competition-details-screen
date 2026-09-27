const express = require('express');
const router = express.Router();
const {
  getCompetitionDetails,
  registerForCompetition,
  submitEntry,
  updateLifecycleOverride,
  resetDemoState,
  getDemoUsers,
} = require('../controllers/competitionController');

// Main Competition routes
router.get('/competitions/:id', getCompetitionDetails);
router.post('/competitions/:id/register', registerForCompetition);
router.post('/competitions/:id/submit', submitEntry);

// Dev / Demo evaluation routes
router.get('/users', getDemoUsers);
router.post('/competitions/:id/override-status', updateLifecycleOverride);
router.post('/dev/reset', resetDemoState);

module.exports = router;
