import React from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import Heading from '../../components/Heading/heading'

const MyAccount = () => {
  return (
    <div>
      <Heading heading={'My Account'} />

      <Grid container spacing={3} marginTop={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom>Account Details</Typography>
          <TextField fullWidth label="User Name" margin="normal" />
          <TextField fullWidth label="Email Address" margin="normal" />
          <TextField fullWidth label="Time Zone" margin="normal" />
          <Button variant="contained" color="primary">Update</Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom>Change Password</Typography>
          <TextField fullWidth label="Current Password" type="password" margin="normal" />
          <TextField fullWidth label="New Password" type="password" margin="normal" />
          <TextField fullWidth label="Confirm Password" type="password" margin="normal" />
          <Button margin="10px" variant="contained" color="primary">Change Password</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyAccount;
