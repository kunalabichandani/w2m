import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";


export const CreatePlan = () =>  {

    let navigate = useNavigate();

    const newEvent = () => {
        navigate("/swipeview", { replace: true });
    }

    return (
      <div>
          <h4>Create a new plan</h4>
          <TextField id="plan_name_text" label="Plan Name" variant="outlined" />
          <TextField id="location_text" label="Location" variant="outlined" />
          <TextField id="radius_text" label="Radius (m)" variant="outlined" />
          <Button onClick={() => newEvent()}>Create Plan</Button>
      </div>
    );
}
export default CreatePlan;