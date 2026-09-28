const express = require('express');
const router = express.Router();
const {
  getCompetitionDetails,
  registerForCompetition,
  submitEntry,
  getDemoUsers,
  updateLifecycleOverride,
  resetDemoState,
} = require('../controllers/competitionController');

// Main Competition routes
router.get('/competitions/:id', getCompetitionDetails);
router.post('/competitions/:id/register', registerForCompetition);
router.post('/competitions/:id/submit', submitEntry);
router.get('/users', getDemoUsers);

// Evaluator Dev & State Machine routes (as documented in README)
router.post('/competitions/:id/override-status', updateLifecycleOverride);
router.post('/dev/reset', resetDemoState);

module.exports = router;

