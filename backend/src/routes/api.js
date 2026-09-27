const express = require('express');
const router = express.Router();
const {
  getCompetitionDetails,
  registerForCompetition,
  submitEntry,
  getDemoUsers,
} = require('../controllers/competitionController');

// Main Competition routes
router.get('/competitions/:id', getCompetitionDetails);
router.post('/competitions/:id/register', registerForCompetition);
router.post('/competitions/:id/submit', submitEntry);
router.get('/users', getDemoUsers);

module.exports = router;

