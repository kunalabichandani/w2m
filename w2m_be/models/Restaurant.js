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
    users: [String],
    default: []
})

module.exports = Restaurant = mongoose.model('Restaurant', RestaurantSchema);