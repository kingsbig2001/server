'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _user = require('../model/user.js');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('/users', function (req, res) {
    _bcryptjs2.default.genSalt(10, function (err, salt) {
        _bcryptjs2.default.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
        });
    });
    res.status(200).send(_user2.default);
});
app.post('/signup', function (req, res) {
    var newUser = req.body;
    if (newUser.username && newUser.email && newUser.password && newUser.name) {
        var found = _user2.default.find(function (check) {
            return check.email === newUser.email;
        });
        if (found) {
            return res.status(400).json({
                message: 'User already exist'
            });
        } else {
            _bcryptjs2.default.genSalt(10, function (err, salt) {
                _bcryptjs2.default.hash(newUser.password, salt, function (err, hash) {
                    newUser.password = hash;
                });
            });
            _user2.default.push(newUser);
            return res.status(201).json({
                message: 'User Registration Successful',
                userDetails: {
                    email: newUser.email,
                    username: newUser.username }
            });
        }
    } else {
        res.status(400).json({
            message: 'Missing Credentials! Please Check and Try again'
        });
    }
});
// POST signin users
app.post('/signin', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        var found = _user2.default.find(function (check) {
            return check.username === username;
        });

        // Load hash from your password DB.
        _bcryptjs2.default.compare(password, found.password, function (err, isMatch) {
            if (err) {
                res.status(401).send({ message: 'Invalid password' });
            }
            if (isMatch) {
                res.status(200).send({ message: 'Welcome to your Weconnect app profile' });
            } else {
                res.status(400).send({ message: 'Password incorrect' });
            }
        });
    }
});

exports.default = app;