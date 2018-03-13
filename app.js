const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const businesses = require('./businesses.js');
const reviews = require('./reviews.js');
// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));



// Setting up API routes
app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Weconnect API!',
}));


// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/businesses/:businessid', (req, res) => {
    let businessid = parseInt(req.params.businessid, 10);
    console.log(businessid)
    let result = businesses.filter(mybiz => mybiz.businessid === businessid)[0];

   if (!result) {
        res.sendStatus(404);
    } else {
        res.send(result);
    }
});

// Setting up API  GET routes for search by location
app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Weconnect API!',
}));

// Setting up API  GET routes for search by category
// app.get('/businesses?location=<location>', (req, res) => res.status(200).send({
//     message: 'Welcome to the Weconnect API!',
// }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/businesses/:businessid/reviews', (req, res) => {
    let bizid = parseInt(req.params.businessid, 10);
    let known = reviews.filter((now) => {
        return now.businessid === bizid;
      });
      known.forEach((memm) =>{
        res.send(memm.comments);
      });
 
});

// GET all businesses
app.get('/businesses', (req, res) => {
    if(req.query){
        res.send(req.query);
    }
      
    
});
app.get('/businesses', (req, res) => res.status(200).send(businesses));
    


// GET all reviews
app.get('/reviews', (req, res) => res.status(200).send(reviews));

// POST a Business for Weconnect
app.post('/businesses', (req, res) => {
    const newBiz = req.body;
    console.log(newBiz.businessid);
    let found = businesses.find((check) => {
        return check.businessid === newBiz.businessid;
    })
    if(found){
        return res.sendStatus(400); 
    }
    else{
    businesses.push(newBiz);
    }
    // return posted businesses
    const result = businesses.filter(newBusiness => newBusiness.businessid === newBiz.id)[0];
    res.send(newBiz);
});

// Post a review
app.post('/businesses/:businessid/reviews', (req, res) => {
    let bizid = parseInt(req.params.businessid, 10);
    const newReview = req.body;
    let known = reviews.filter((now) => {
        return now.businessid === bizid;
      }); 
    res.send(found);
    // if(found){
    //     reviews.push(newBiz);
    // }
    // else{
    //  return res.sendStatus(400); 
    // }
    // if (!item.id) {
    //     return res.sendStatus(500);
    // }

    // businesses.review.push(item.review);
    // // return posted businesses
    // const result = businesses.filter(newbusinesses => newbusinesses.id === item.id)[0];
    // res.send(result);
});
// PUT Method
app.put('/api/businesses/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const oldbusinesses = businesses.filter(r => r.id === id)[0];

    if (!oldbusinesses) {
        const item = req.body;
        item.id = id;
        businesses.push(item);
        // res.setHeader('Location', `/api/businesses/) + {id}`);
        res.sendStatus(201);
    } else {
        oldbusinesses.name = req.body.name;
        oldbusinesses.id = req.body.id;
        oldbusinesses.reviews = req.body.reviews;
        res.sendStatus(204);
    }
});
// Delete Method
app.delete('/businesses/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const existingItem = businesses.filter(r => r.id === id)[0];

    if (!existingItem) {
        return res.sendStatus(404);
    }

    // const newbusinesses = businesses.filter(r => r.id !== id);
    // res.sendStatus(204);
});

module.exports = app;