import React from 'react';
import { Grid, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Switch from '../Switch/Switch';

const ClientInfo = () => {
  return (
    <div>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="title-company-label">Title Company</InputLabel>
            <Select labelId="title-company-label" id="title-company" label="Title Company">
              <MenuItem value={10}>Company A</MenuItem>
              <MenuItem value={20}>Company B</MenuItem>
              <MenuItem value={30}>Company C</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="closing-type-label">Closing Type</InputLabel>
            <Select labelId="closing-type-label" id="closing-type" label="Closing Type">
              <MenuItem value="Refinance">Refinance</MenuItem>
              <MenuItem value="Purchase">Purchase</MenuItem>
              <MenuItem value="Sale">Sale</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField fullWidth id="internal-reference" label="Internal Reference" variant="outlined" />
        </Grid>
{/*         
        <Grid item xs={12} sm={3}>
        <Switch />
        </Grid> */}

        <Grid item xs={12} sm={6}>
          <TextField fullWidth id="property-address-one" label="Property Address One" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth id="property-address-two" label="Property Address Two" variant="outlined" />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField fullWidth id="property-city" label="Property City" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth id="property-state" label="Property State" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth id="property-zip-code" label="Property Zip Code" variant="outlined" />
        </Grid>

      </Grid>
    </div>
  );
}

export default ClientInfo;
