require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const Status = require('./models/Status');
const User = require('./models/User');
const moment = require('moment');


const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(helmet());

const loginLimiter = new RateLimit({
    windowMs: 5*60*1000,
    max: 5,
    delayMs: 0,
    message: 'Maximum login attempts exceeded'
});
const signupLimiter = new RateLimit({
    windowMs: 60*60*1000,
    max: 3,
    delayMs: 0,
    message: "Maximum accounts created. Try again later."
});

mongoose.connect('mongodb://localhost/theTea', {useNewUrlParser: true});
const db = mongoose.connection;
db.once('open', () => {
    console.log(`Connected to Mongo on ${db.host}:${db.port}`);
});
db.on('error', (err) => {
    console.log(`Database error:\n${err}`)
});

app.use('/auth/login',loginLimiter);
app.use('/auth/signup', signupLimiter);
app.use('/auth', require('./routes/auth'));
app.use('/api', expressJWT({secret: process.env.JWT_SECRET}), require('./routes/api'));
// app.use('/comment', require('./routes/comment'))

//! Test route
app.get('/parent', function(req, res) {
    res.json('I am the parent');
});

app.get('/allStatus', function(req, res) {
    Status.find({}, function(err, status) {
        if (err) res.json(err)
        res.json(status)
    })
})

//! POST status

app.post('/status', function(req, res) {
    var curDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    Status.create({
        text: req.body.text,
        picture: req.body.picture,
        emotion: req.body.emotion,
        date: curDate
    }, function(err, status) {
        if (err) res.json(err)
        res.json(status)
    })
})

app.delete('/status', (req,res) => {
    Status.findByIdAndDelete(req.params.id, function(err, status) {
        if (err) res.json(err)
        res.json(status)
    })
})

// //! POST One User comment
//? Need to get this to work where it takes the current user data and enters it...

// app.get('/status/:id', (req,res) => {
//     User.findById(req.params.id, function(err, status) {

//     })
// })
// app.get('/comments/:id', (req, res) => {
//     Status.findById(req.body.user, function(err, status) {
//         if(err) {
//             res.json(err)
//         }   
//         res.json(status)
//     }.then())
// })

// app.get("/comments/:id", (req, res) => {
//     User.findById(req.params.id, function(err, user) {
//         commentSchema.findById(req.body.id, function(err, comment) {
//             user.comments.push(comment);
//             user.save( function(err) {
//                 comment.user.push(user);
//                 comment.save( function(err) {
//                     if (err) res.json(err)
//                     res.json(user)
//                 })
//             })
//         })
//     })
// })

//! GET all status

app.get('/status/:id', (req, res) => {
    Status.findById({}, function(err, status) {
        if(err) res.json(err)
        res.json(status)
    })
})

app.listen(process.env.PORT, () => {
    console.log(`listening to port ${process.env.PORT}!!! 👍🏼 👍🏼`)
})