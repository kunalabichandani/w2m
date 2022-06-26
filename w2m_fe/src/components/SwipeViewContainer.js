import React, { useState } from 'react'
import SwipeView from './SwipeView';
import { useEffect } from 'react';
import axios from 'axios';
import test_json from '../utils/test_nearby.json'
import { CircularProgress } from '@mui/material';
import { createNewPlan } from '../actions/baseactions'

export const SwipeViewContainer = () => {

    const [restaurants, setRestaurants] = useState("");
    const [spinnerState, setSpinnerState] = useState(false);

    // const getNearbyResults = async() => {
    //     console.log("ran get nearby on fe");
    //     const res = await axios.get('http://localhost:3001/getNearby');
    //     return await res.data;
    // };


    // useEffect(() => {
    //     setRestaurants(test_json);
    //   }, []);

    useEffect(() => {
        console.log(restaurants.results);
    }, [restaurants])


    useEffect(() => {
        console.log("ran once");
        setSpinnerState(true);
        createNewPlan("12.896320380481642,80.22045068754917", 1500, "lakala").then(result => {
            setRestaurants(result);
            setSpinnerState(false);
            console.log(result);
        })
        .catch(function(error) {
            console.log(error);
        });
      }, []);

  return (
      <div>
          { restaurants ? <SwipeView options={restaurants.results}/> : null }
          { spinnerState ? <CircularProgress /> : null }
      </div>
  )
}

export default SwipeViewContainer;
