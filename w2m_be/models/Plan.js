const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    address: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    }, 
    users: [String]
})

//Create Conversation Schema -- this is our parent document
const PlanSchema = new Schema({
    url: {
        type: String,
    },
    name: {
        type: String, 
        required: true,
    },
    location: {
        type: String, 
        required: true,
    }, 
    radius: {
        type: Number, 
        default: 1500
    },
    restaurants: [RestaurantSchema],
});

module.exports = Plan = mongoose.model('Plan', PlanSchema);