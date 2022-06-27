import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';


export const Landing = () =>  {

    let navigate = useNavigate();

    const newEvent = () => {
        navigate("/create", { replace: true });
    }

    return (
      <div>
          <p>Create a new plan to share with friends</p>
          <Button onClick={() => newEvent()}>Create Plan</Button>
      </div>
    );
}
export default Landing;