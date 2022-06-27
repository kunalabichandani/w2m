import axios from 'axios';

export const createNewPlan = async (location, radius, name) => {
    console.log("ran createNewPlan on fe");
    const res = await axios.post('http://localhost:3001/api/newPlan', {
        location: location, 
        radius: radius, 
        name: name
    })
    return await res.data;
};

export const getFullPlan = async (url) => {
    console.log("ran get full plan on fe");
    const res = await axios.get('http://localhost:3001/api/getFullPlan', { params: { url: url } })
    return await res.data.plan[0];
};

export const submitToPlan = async (url, userName, restaurants) => {
    console.log("ran get full plan on fe");
    const res = await axios.post('http://localhost:3001/api/submitToPlan', {
        url: url, 
        userName: userName, 
        restaurants: restaurants,
    })
    return await res.data;
};


