import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom'
import { getFullPlan } from '../../actions/baseactions'
import SwipeView2 from './SwipeView2';

export const JoinContainer = () => {

    const [planDetails, setPlanDetails] = useState({});
    const [restaurants, setRestaurants] = useState([]);
    const [spinnerState, setSpinnerState] = useState(false);

    const { url } = useParams();


    // const getNearbyResults = async() => {
    //     console.log("ran get nearby on fe");
    //     const res = await axios.get('http://localhost:3001/getNearby');
    //     return await res.data;
    // };


    // useEffect(() => {
    //     setRestaurants(test_json);
    //   }, []);

    // useEffect(() => {
    //     console.log(restaurants.results);
    // }, [restaurants])


    useEffect(() => {
        setSpinnerState(true);
        (async () => {
            const planDetails = await getFullPlan(url);
            setPlanDetails(planDetails);
            setRestaurants(planDetails.restaurants);
            setSpinnerState(false);
          })();
      }, []);


  return (
      <div>
        <h3> { planDetails.name } </h3>
        { planDetails.radius ? <h6>{ planDetails.radius } metres from { planDetails.location} </h6> : null }
        {/* need to add functionality to redirect to 404 if plan not found*/}
        { planDetails.url ? <p>Share link with friends: http://localhost:3000/{ url }</p> : null }
        { spinnerState ? <CircularProgress /> : null }
        { restaurants ? <SwipeView2 url={planDetails.url} options={restaurants}/> : null }

      </div>
  )
}

export default JoinContainer;