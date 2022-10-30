const express = require('express');

const emojis = require('./emojis');

const router = express.Router();

// Import at the top
const movies = require('./movies');

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);

router.use('/movies', movies);

module.exports = router;
