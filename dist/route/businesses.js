'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _businesses = require('../model/businesses.js');

var _businesses2 = _interopRequireDefault(_businesses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('/:businessid', function (req, res) {
    var businessid = parseInt(req.params.businessid, 10);
    console.log(businessid);
    var result = _businesses2.default.filter(function (mybiz) {
        return mybiz.businessid == businessid;
    })[0];

    if (!result) {
        res.status(404).json({
            message: 'Business not found'
        });
    } else {
        res.status(200).json({
            message: 'Found business with businessid ' + businessid,
            business: result });
    }
});

app.get('/:businessid/reviews', function (req, res) {
    var bizid = parseInt(req.params.businessid, 10);
    var known = _businesses2.default.filter(function (bizReviews) {
        return bizReviews.businessid === bizid;
    });
    known.forEach(function (memm) {
        res.send(memm.reviews);
    });
});

app.get('/', function (req, res, next) {
    var location = req.query.location;
    var category = req.query.category;

    if (location) {
        var sameBusinessLocations = _businesses2.default.filter(function (lookup) {
            return lookup.location === location;
        });
        if (sameBusinessLocations.length === 0) {
            res.send('No business found');
        } else {
            res.send(sameBusinessLocations);
        }
    }
    if (category) {
        var sameBusinessCategory = _businesses2.default.filter(function (bizCategory) {
            return bizCategory.category === category;
        });
        if (sameBusinessCategory.length === 0) {
            res.send('No business found in this category');
        } else {
            res.send(sameBusinessCategory);
        }
    }
    res.send(_businesses2.default);
});

// Post a review 
app.post('/:businessid/reviews', function (req, res) {
    var bizid = parseInt(req.params.businessid, 10);
    var newReview = req.body.review;
    var known = _businesses2.default.filter(function (now) {
        return now.businessid === bizid;
    });

    if (known.length === 0) {
        res.sendStatus(500);
    } else {
        known[0].reviews.push(newReview);
        res.send(known);
    }

    // businesses.review.push(item.review);
    // // return posted businesses
    // const result = businesses.filter(newbusinesses => newbusinesses.id === item.id)[0];
    // res.send(result);
});

// Register a business
app.post('/', function (req, res) {
    var newBiz = req.body;
    console.log(newBiz.businessid);
    var found = _businesses2.default.find(function (check) {
        return check.businessid === newBiz.businessid;
    });
    if (found) {
        return res.sendStatus(400);
    } else {
        _businesses2.default.push(newBiz);
    }
    // return posted businesses
    var result = _businesses2.default.filter(function (newBusiness) {
        return newBusiness.businessid === newBiz.id;
    })[0];
    res.status(201).json({
        message: 'new business added',
        newBusiness: newBiz });
});

// PUT Method
app.put('/:businessid', function (req, res) {
    var businessId = parseInt(req.params.businessid, 10);
    var oldBusiness = _businesses2.default.find(function (allBiz) {
        return allBiz.businessid === businessId;
    });

    if (!oldBusiness) {
        var newBiz = req.body;
        _businesses2.default.push(newBiz);
        res.send(newBiz);
    } else {
        oldBusiness.name = req.body.name;
        oldBusiness.location = req.body.location;
        oldBusiness.keyword = req.body.keyword;
        oldBusiness.category = req.body.category;
        oldBusiness.reviews = req.body.reviews;
        res.send(oldBusiness);
    }
});
// Delete Method
app.delete('/businesses/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);
    var existingItem = _businesses2.default.filter(function (r) {
        return r.id === id;
    })[0];

    if (!existingItem) {
        return res.sendStatus(404);
    }

    // const newbusinesses = businesses.filter(r => r.id !== id);
    // res.sendStatus(204);
});
exports.default = app;