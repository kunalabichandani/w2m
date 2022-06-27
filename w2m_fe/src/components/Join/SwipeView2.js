import React, { useEffect, useState } from 'react'
import { submitToPlan } from '../../actions/baseactions';
import Restaurant from '../Restaurant';
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";



export const SwipeView2 = ({url, options}) => {

    const [currentRestaurant, setCurrentRestaurant] = useState('');
    const [selectedRestaurants, setselectedRestaurants] = useState([]);
    const [randomizedRestaurantArray, setRandomizedResaturantArray] = useState([]);
    const [counter, setCounter] = useState(0);
    const [userName, setUserName] = useState("");

    let navigate = useNavigate();

    const chooseNextRestaurant = () => {
        setCurrentRestaurant(randomizedRestaurantArray.shift());
    }

    const handleClick = (userChoice) => {
        
        console.log(`user chose ${currentRestaurant.name}: ${userChoice}`);
        if (userChoice == true) {
            console.log(currentRestaurant._id);
            selectedRestaurants.push(currentRestaurant._id);
            console.log(selectedRestaurants);
        }
        if (counter == 9) {
            submitToPlan(url, userName, selectedRestaurants);
            navigate(`/${url}`, { replace: true });
        } else {
            setCounter(counter + 1);
            chooseNextRestaurant();
        }
        
    }

    useEffect(() => {
        console.log(options);
        setRandomizedResaturantArray(options);
      }, [options]);

    useEffect(() => {
        if (randomizedRestaurantArray.length != 0) {
            chooseNextRestaurant();
            console.log("choosing first restaurant");
        }
    }, [randomizedRestaurantArray]);

  return (
      <div>
          <TextField id="user_name_text" label="User Name" variant="outlined" onChange={(event) => {setUserName(event.target.value)}}/>
          {currentRestaurant ? <Restaurant restaurantName={currentRestaurant.name} restaurantAddy={currentRestaurant.vicinity} restaurantRating={currentRestaurant.rating}/> : null}
          <button onClick={() => handleClick(false)}>Nah</button>
          <button onClick={() => handleClick(true)}>Yeet</button>
      </div>
  )
}

export default SwipeView2;
