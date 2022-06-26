import React from 'react'

export const Restaurant = ({restaurantName, restaurantAddy, restaurantRating}) => {

  return (
      <div>
        <h3>{restaurantName}</h3>
        <p>{restaurantAddy}</p>
        <p>Rating: {restaurantRating} / 5</p>
      </div>
  )
}

export default Restaurant;
