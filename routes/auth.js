const express = require('express');
const router = express.Router();
const User = require('../models/User')
const jwt = require('jsonwebtoken');

//! Route for signup
router.post('/signup', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (user) {
            res.json({type: 'error', message: 'Email already exists'})
        }   else {
            let user = new User ({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            user.save( (err, user) => {
                if (err) {
                    res.json({type: 'error', message: 'Database error creating user', err})
                }   else {
                    var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                        expiresIn: "1m"
                    });
                    res.status(200).json({type: 'success', user: user.toObject(), token})
                }
            })
        }
    })
})

//! Route for login
router.post('/login', (req,res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            res.json({type: 'error', message: 'Account not found'})
        } else {
            if (user.authenticated(req.body.password)) {
                var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                    expiresIn: '1d'
                });
                res.json({type: 'success', user: user.toObject(), token})
            }   else {
                res.json({type: 'error', message: 'Authentication failure'})
            }
        }
    })
})

//! Route for validating tokens
router.post('/me/from/token', (req,res) => {
    var token = req.body.token;
    if (!token) {
        res.json({type: 'error', message: 'you must submit a valid token'})
    }   else {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.json({type: 'error', message: 'Invalid token. Please login again.'})
            } else {
                User.findById(user._id, (err, user) => {
                    if (err) {
                        res.json({type: 'error', message: 'Database error during validation'})
                    } else {
                        res.json({type: 'success', user: user.toObject(), token})
                    }
                })
            }
        })
    }
})


module.exports = router;