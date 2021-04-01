const express = require('express');
const router = express.Router();

// Tests profile route (GET METHOD) api/prfile/test
// Public
router.get('/test', (req, res) => res.json({ msg : 'Profile Works'}));

module.exports = router;