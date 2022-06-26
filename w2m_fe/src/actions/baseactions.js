import axios from 'axios';

export const createNewPlan = async (location, radius, name) => {
    console.log("ran get nearby on fe");
    const res = await axios.post('http://localhost:3001/api/newPlan', {
        location: location, 
        radius: radius, 
        name: name
    })
    return await res.data;
};


