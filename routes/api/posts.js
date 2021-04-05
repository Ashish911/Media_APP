const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post Model
const Post = require('../../models/Post');

// Post Validation
const postInput = require('../../validation/post');

// Tests post route (GET METHOD) api/posts/test
// Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// Create posts (POST METHOD) api/posts/
// Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = postInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then((post) => res.json(post));
  }
);

module.exports = router;
