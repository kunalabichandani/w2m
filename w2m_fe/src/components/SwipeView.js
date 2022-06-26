import React, { useEffect, useState } from 'react'
import Restaurant from './Restaurant';

export const SwipeView = ({options}) => {

    const [currentRestaurant, setCurrentRestaurant] = useState('');
    const [currentRestaurantChoice, setCurrentRestaurantChoice] = useState(false);
    const [randomizedRestaurantArray, setRandomizedResaturantArray] = useState([]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const randomizeSliceOptions = () => {
        setRandomizedResaturantArray(shuffleArray(options).slice(0, 10));
    }

    const chooseNextRestaurant = () => {
        setCurrentRestaurant(randomizedRestaurantArray.shift());
    }

    const handleClick = (userChoice) => {
        console.log(`user chose ${currentRestaurant.name}: ${userChoice}`);
        setCurrentRestaurantChoice(userChoice);
        chooseNextRestaurant();
    }

    useEffect(() => {
        console.log("randomized");
        randomizeSliceOptions();
      }, []);

    useEffect(() => {
        if (randomizedRestaurantArray.length != 0) {
            chooseNextRestaurant();
            console.log("choosing first restaurant");
        }
    }, [randomizedRestaurantArray]);

  return (
      <div>
          {currentRestaurant ? <Restaurant restaurantName={currentRestaurant.name} restaurantAddy={currentRestaurant.vicinity} restaurantRating={currentRestaurant.rating}/> : null}
          <button onClick={() => handleClick(false)}>Nah</button>
          <button onClick={() => handleClick(true)}>Yeet</button>
      </div>
  )
}

export default SwipeView;
