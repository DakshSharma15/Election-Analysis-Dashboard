const express = require('express');
const router = express.Router();
const {
  getStateResults,
  getWinningProbability,
  getSentimentAnalysis
} = require('../controllers/analysisController');

router.get('/state-results', getStateResults);
router.get('/winning-probability', getWinningProbability);
router.get('/sentiment-analysis', getSentimentAnalysis);

module.exports = router;
