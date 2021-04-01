const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../../config/keys').secretOrKey;

// Model
const User = require('../../models/User');

// Tests user route (GET METHOD) api/users/test
// Public
router.get('/test', (req, res) => res.json({ msg : 'User Works'}));

// Register user (POST METHOD) api/users/register
// Public
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user){
                return res.status(400).json({ email: "Email already exists"});
            } else {

                const avatar = gravatar.url(req.body.email, {
                    s: '200', // Size
                    r: 'pg', // Rating
                    d: 'mm' // Default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,  
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json({
                                success: true,
                                data: user
                            }))
                            .catch(err => console.log(err));
                    });
                })
            }
        });
});

// Login user / Returning JWT TOKEN (POST METHOD) api/users/login
// Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email })
        .then(user => {
            // Check for user
            if(!user) {
                return res.status(400).json({
                    success: false,
                    email: 'User not found.'
                });
            }

            // Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // User Matched
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        } //Create JWT Payload

                        // Sign Token
                        jwt.sign(payload, secret, {
                            expiresIn: 3600
                        }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        });
                    } else {
                        return res.status(400).json({
                            success: false,
                            password: 'Password Incorrect.'
                        });
                    }
                })

        });

})


module.exports = router;