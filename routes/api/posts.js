const express = require('express');
const router = express.Router();

// Tests post route (GET METHOD) api/posts/test
// Public
router.get('/test', (req, res) => res.json({ msg : 'Posts Works'}));

module.exports = router;