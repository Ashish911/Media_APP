const express = require('express');
const router = express.Router();

// Tests user route (GET METHOD) api/users/test
// Public
router.get('/test', (req, res) => res.json({ msg : 'User Works'}));

module.exports = router;