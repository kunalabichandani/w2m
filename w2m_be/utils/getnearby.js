const axios = require('axios')

const getNearby = async (location, radius) => {
    const locationArray = location.split(",");
    const lat = locationArray[0];
    const long = locationArray[1];
    
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${long}&radius=${radius}&type=restaurant&key=AIzaSyAIyIHGG8l_L5rQsGFd4joquCTm5DgIHvU`,
        // url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=39.95578103620712%2C-75.20390345632566&radius=1500&type=restaurant&key=AIzaSyAIyIHGG8l_L5rQsGFd4joquCTm5DgIHvU',
        // url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=12.896320380481642%2C80.22045068754917&radius=1500&type=restaurant&key=AIzaSyAIyIHGG8l_L5rQsGFd4joquCTm5DgIHvU',
        headers: { },
      };
    try {
        const response = await axios(config);
        return response.data;
    } 
    catch (e) {
        console.log(error);
    }
}


// below is the promise based function of the one above

// const getNearby = async (location, radius) => {
//     const locationArray = location.split(",");
//     const lat = locationArray[0];
//     const long = locationArray[1];
    
//     var config = {
//         method: 'get',
//         url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${long}&radius=${radius}&type=restaurant&key=AIzaSyAIyIHGG8l_L5rQsGFd4joquCTm5DgIHvU`,
//         // url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=39.95578103620712%2C-75.20390345632566&radius=1500&type=restaurant&key=AIzaSyAIyIHGG8l_L5rQsGFd4joquCTm5DgIHvU',
//         // url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=12.896320380481642%2C80.22045068754917&radius=1500&type=restaurant&key=AIzaSyAIyIHGG8l_L5rQsGFd4joquCTm5DgIHvU',
//         headers: { },
//       };
    
//     return new Promise(function(resolve,success){
//         axios(config)
//       .then(function (response) {
//         // console.log(JSON.stringify(response.data));
//         resolve(response.data);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });  
//     })
// }

module.exports = getNearby;
