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

app.get('/getNearby', (req, res) => {
    var config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=39.95578103620712%2C-75.20390345632566&radius=1500&type=restaurant&key=AIzaSyAIyIHGG8l_L5rQsGFd4joquCTm5DgIHvU',
        // url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=12.896320380481642%2C80.22045068754917&radius=1500&type=restaurant&key=AIzaSyAIyIHGG8l_L5rQsGFd4joquCTm5DgIHvU',
        headers: { },
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });  
})

app.post('/createPlan', async (req, res) => {
    console.log("created new plan");
    console.log(req.body);
    const plan = new Plan(req.body);
  
    try {
      await plan.save();
      res.send(plan);
    } catch (error) {
      res.status(500).send(error);
    }
})


// here are the real routes, above are for testing

app.post('/newPlan', async (req, res) => {
    console.log("create new plan route");
    // catch any errors
    // create a unique url for the plan
    const url = generateURL();
    // get the nearby restaurants from google places api based on location/radius
    const location = req.body.location; 
    const radius = req.body.radius ?  req.body.radius : 1500;
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

app.post('/submitToPlan', (req, res) => {
  const reqPlanURL = req.body.url;
  const userName = req.body.userName; 
  const restaurants = req.body.restaurants;
  restaurants.forEach((element) => {
    Plan.findOneAndUpdate({url: reqPlanURL, "restaurants._id": new ObjectId(element)}, 
      {$push: {"restaurants.$.users": userName}}, (err, doc) => {
        if (err){
          return res.status(400).json({added: false});
        } else {
          return res.status(200).json({added: true});
        }
      }
    )
  })
})

// app.post('/blah', (req, res) => {
//     const location = req.body.location; 
//     const radius = req.body.radius ?  req.body.radius : 1500;
//     getNearby(location, radius).then((data) => (console.log(data)));
//     // const test = await getNearby(location, 200); 
//     // console.log(test);
// })


module.exports = app;