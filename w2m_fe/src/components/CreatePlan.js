import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { createNewPlan } from '../actions/baseactions'
import { CircularProgress } from "@mui/material";

export const CreatePlan = () =>  {

    const [planName, setPlanName] = useState("");
    const [location, setLocation] = useState("");
    const [radius, setRadius] = useState("");
    const [spinnerState, setSpinnerState] = useState(false);

    let navigate = useNavigate();

    const newEvent = async () => {
        setSpinnerState(true);
        console.log("creating new event");
        // need to add error handlers in case any of the params is missing and is in the right order
        const response = await createNewPlan(location, radius, planName);
        setSpinnerState(false);
        console.log("created new event, response below");
        console.log(response);
        navigate(`/${response.url}`, { replace: true });
    }

    return (
      <div>
          <h4>Create a new plan</h4>
          <TextField id="plan_name_text" label="Plan Name" variant="outlined" onChange={(event) => {setPlanName(event.target.value)}}/>
          <TextField id="location_text" label="Location" variant="outlined" onChange={(event) => {setLocation(event.target.value)}}/>
          <TextField id="radius_text" label="Radius (m)" variant="outlined" onChange={(event) => {setRadius(event.target.value)}}/>
          <Button onClick={() => newEvent()}>Create Plan</Button>
          { spinnerState ? <CircularProgress /> : null }
      </div>
    );
}
export default CreatePlan;