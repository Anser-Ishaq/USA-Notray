import React from 'react';
import {
  Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Box, Grid, Checkbox, FormGroup, FormControlLabel, Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BackButton } from '../../components/DynamicButton/DynamicButton';
import { stateOptions, timeZones } from './data';

const UserForm = ({ formData, setFormData, roles, privileges, handleSubmit, handleClose }) => {
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      sx={{
        mt: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: { xs: '100%', md: '100%' },
        height: 'auto',
        padding: '30px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '8px',
        boxShadow: theme.shadows[2],
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BackButton handleBack={handleClose}/>

        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Title Company Information</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            required
            name="companyName"
            placeholder='1 Source Title and Escrow, LLC'
            value={formData.companyName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Preferred Notary ID"
            variant="outlined"
            fullWidth
            name="preferredNotaryID"
            placeholder='N-1-a5d26'
            value={formData.preferredNotaryID}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Company Address Line 1"
            variant="outlined"
            fullWidth
            required
            name="companyAddressLine1"
            placeholder='1707 Orlando Central Parkway'
            value={formData.companyAddressLine1}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Company Address Line 2"
            variant="outlined"
            fullWidth
            name="companyAddressLine2"
            placeholder='Suite 301-A'
            value={formData.companyAddressLine2}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Company City"
            variant="outlined"
            fullWidth
            required
            name="companyCity"
            placeholder='Orlando'

            value={formData.companyCity}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
      <FormControl fullWidth variant="outlined" required>
        <InputLabel>Company State</InputLabel>
        <Select
          label="Company State"
          name="companyState"
          value={formData.companyState}
          onChange={handleChange}
        >
          {stateOptions.map(state => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>     
        <Grid item xs={12} md={4}>
          <TextField
            label="Company ZIP"
            variant="outlined"
            fullWidth
            required
            name="companyZIP"
            placeholder='32809'
            value={formData.companyZIP}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Primary Contact Name"
            variant="outlined"
            fullWidth
            required
            name="primaryContactName"
            placeholder='Becky Mead'
            value={formData.primaryContactName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Primary Contact Number"
            variant="outlined"
            fullWidth
            required
            name="primaryContactNumber"
            placeholder='.(615) 971-1962'
            value={formData.primaryContactNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={1} md={4}>
          <TextField
            label="Primary contact email address"
            variant="outlined"
            fullWidth
            required
            name="PrimaryContactEmailAddress"
            placeholder='orders@1sourcetitle.com'
            value={formData.PrimaryContactEmailAddress}
            onChange={handleChange}
          />
        </Grid>
        
    
  <Grid item xs={12} md={2}>
    <FormControl fullWidth variant="outlined" required>
      <InputLabel>--select--</InputLabel>
      <Select
        label="Time Zone"
        name="timeZone"
        value={formData.timeZone}
        onChange={handleChange}
      >
        <MenuItem value="">
        </MenuItem>
        {timeZones.map((zone, index) => (
          <MenuItem key={index} value={zone}>
            {zone}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>

          <Grid item xs={12} md={3}>
          <TextField
            label="Secondary Contact Name"
            variant="outlined"
            fullWidth
            required
            name="secondaryContactName"
            placeholder='Enter Secondary contect Name'
            value={formData.secondaryContactName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Secondary Contact Number"
            variant="outlined"
            fullWidth
            required
            name="secondaryContactNumber"
            placeholder='Enter Secondary contect Number'
            value={formData.secondaryContactNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={1} md={4}>
          <TextField
            label="Secondary contact email address"
            variant="outlined"
            fullWidth
            required
            name="secondaryContactEmailAddress"
            placeholder='Enter Secondary contect Email Address'
            value={formData.secondaryContactEmailAddress}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={2}>
    <FormControl fullWidth variant="outlined" required>
      <InputLabel>--select--</InputLabel>
      <Select
        label="Time Zone"
        name="timeZone"
        value={formData.timeZone}
        onChange={handleChange}
      >
        <MenuItem value="">
        </MenuItem>
        {timeZones.map((zone, index) => (
          <MenuItem key={index} value={zone}>
            {zone}
          </MenuItem>   
        ))}
      </Select>
    </FormControl>
  </Grid>

       <Grid item xs={12} md={3}>
          <TextField
            label="Third Contact Name"
            variant="outlined"
            fullWidth
            required
            name="thirdContactName"
            placeholder='Enter Third Contact Name'
            value={formData.thirdContactName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Third Contact Number"
            variant="outlined"
            fullWidth
            required
            name="thirdContactNumber"
            placeholder='Enter Third Contact Number'
            value={formData.thirdContactNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={1} md={4}>
          <TextField
            label="Third contact email address"
            variant="outlined"
            fullWidth
            required
            name="thirdContactEmailAddress"
            placeholder='Enter Third Contact Email Address'
            value={formData.thirdContactEmailAddress}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={2}>
    <FormControl fullWidth variant="outlined" required>
      <InputLabel>--select--</InputLabel>
      <Select
        label="Time Zone"
        name="timeZone"
        value={formData.timeZone}
        onChange={handleChange}
      >
        <MenuItem value="">

        </MenuItem>
        {timeZones.map((zone, index) => (
          <MenuItem key={index} value={zone}>
            {zone}
          </MenuItem>
        ))}
      </Select>
            </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Fourth Contact Name"
            variant="outlined"
            fullWidth
            required
            name="fourthContactName"
            placeholder='Enter Fourth Contact Name'
            value={formData.fourthContactName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Fourth Contact Number"
            variant="outlined"
            fullWidth
            required
            name="fourthContactNumber"
            placeholder='Enter Fourth Contact Number'
            value={formData.fourthContactNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={1} md={4}>
          <TextField
            label="Fourth contact email address"
            variant="outlined"
            fullWidth
            required
            name="fourthContactEmailAddress"
            placeholder='Enter Fourth Contact Email Address'
            value={formData.fourthContactEmailAddress}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={2}>
    <FormControl fullWidth variant="outlined" required>
      <InputLabel>--select--</InputLabel>
      <Select
        label="Time Zone"
        name="timeZone"
        value={formData.timeZone}
        onChange={handleChange}
      >
        <MenuItem value="">
        </MenuItem>
        {timeZones.map((zone, index) => (
          <MenuItem key={index} value={zone}>
            {zone}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.requireKBA}
                onChange={(e) => setFormData({ ...formData, requireKBA: e.target.checked })}
              />
            }
            label="Always Require Knowledge-based Authentication (KBA)?"
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserForm;
