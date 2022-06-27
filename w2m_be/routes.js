const express = require("express");
const app = express();
const axios = require('axios')
const Plan = require('./models/Plan');
const Restaurant = require('./models/Restaurant');
const generateURL = require('./utils/urlgen');
const getNearby = require('./utils/getnearby');
const shuffleSpliceArray = require('./utils/shufflearray');
const ObjectId = require('mongodb').ObjectID;

app.set('case sensitive routing', true);

// here are the real routes, above are for testing

app.post('/newPlan', async (req, res) => {
    console.log("create new plan route");
    // catch any errors
    // create a unique url for the plan
    const url = generateURL();
    // get the nearby restaurants from google places api based on location/radius
    const location = req.body.location; 
    const radius = req.body.radius ?  parseInt(req.body.radius) : 1500;
    const name = req.body.name;
    const response = await getNearby(location, radius); 
    // randomize and slice the returned restaurant object array
    const shuffledResponse = shuffleSpliceArray(response.results);
    // organize and store only the relevant restaurant information in db
    let restaurantsArray = []
    shuffledResponse.forEach((element) => {
      const newRestaurant = new Restaurant({
        name: element.name,
        address: element.vicinity,
        rating: element.rating, 
      });
      restaurantsArray.push(newRestaurant);
    });
    const newPlan = new Plan({
      url: url, 
      name: name, 
      location: location,
      radius: radius,
      restaurants: restaurantsArray
    })
    // save plan to db and return the new plan object
    newPlan
      .save()
      .then(plan => res.json(plan))
      .catch(err => console.log(err));
})

app.get('/getFullPlan', (req, res) => {
  const reqPlanURL = req.query.url;
  Plan.find({url: reqPlanURL}, (err, doc) => {
    if (err){
      return res.status(404).json({plan: null});
    } else {
      return res.status(200).json({plan: doc});
    }
  })
})

app.post('/submitToPlan', async (req, res) => {
  console.log("wtf");
  const reqPlanURL = req.body.url;
  const userName = req.body.userName; 
  const restaurants = req.body.restaurants;
  (async () => {
    try {
      restaurants.forEach(async (element) => {
        await Plan.findOneAndUpdate({url: reqPlanURL, "restaurants._id": new ObjectId(element)}, 
          {$push: {"restaurants.$.users": userName}}
        )
      })
      return res.status(200).json({added: true}); 
    } catch (err) {
      console.error(err)
      return res.status(400).json({added: false});
    }
  })()
  // *** the below method doesnt work because it does res.send for each item in the restaurants array ***
  // const updatePromises = restaurants.forEach((element) => {
  //   console.log("hello")
  //   Plan.findOneAndUpdate({url: reqPlanURL, "restaurants._id": new ObjectId(element)}, 
  //     {$push: {"restaurants.$.users": userName}} , (err, doc) => {
  //   console.log(err);
  //   if (err){
  //     console.log('first branch');
  //   return res.status(400).json({added: false});  
  //   } else {
  //     console.log('second branch');
  //   return res.status(200).json({added: true});
  //   }
  // })
})

module.exports = app;