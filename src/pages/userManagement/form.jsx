// src/components/UserForm.jsx
import React from 'react';
import {
  Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Box, Checkbox, FormGroup, FormControlLabel, Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const UserForm = ({ formData, setFormData, roles, privileges, handleSubmit, handleClose }) => {
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (privilege) => {
    setFormData((prevData) => {
      const updatedPrivileges = prevData.privileges.includes(privilege)
        ? prevData.privileges.filter((item) => item !== privilege)
        : [...prevData.privileges, privilege];
      return {
        ...prevData,
        privileges: updatedPrivileges,
      };
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
        boxShadow: theme.shadows[5],
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant="contained" onClick={handleClose} sx={{ alignSelf: 'flex-start' }}>
          Back
        </Button>
        <Typography variant="h6"  sx={{ flexGrow: 1 }} style={{marginLeft:'10px'}}>
          User Information
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <TextField
          label="User Name"
          variant="outlined"
          fullWidth
          required
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          required
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          required
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <FormControl fullWidth variant="outlined" required>
          <InputLabel>Role</InputLabel>
          <Select
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            {roles.map((role, index) => (
              <MenuItem key={index} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h6" sx={{ mt: 2 }}>Privileges:</Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.privileges.includes('Dashboard')}
              onChange={() => handleCheckboxChange('Dashboard')}
            />
          }
          label="Dashboard"
          sx={{ display: 'block' }} // Make each checkbox on a new line
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.privileges.includes('Notary Dashboard')}
              onChange={() => handleCheckboxChange('Notary Dashboard')}
            />
          }
          label="Notary Dashboard"
          sx={{ display: 'block' }} 
        />
        
        <Typography variant="h6" sx={{ mt: 2 }}>Job Management</Typography>
        <Box sx={{ pl: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.privileges.includes('Notarize A Document')}
                onChange={() => handleCheckboxChange('Notarize A Document')}
              />
            }
            label="Notarize A Document"
            sx={{ display: 'block' }} 
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.privileges.includes('Jobs List')}
              onChange={() => handleCheckboxChange('Jobs List')}
            />
            }
            label="Jobs List"
            sx={{ display: 'block' }} 
          />
           <FormControlLabel
            control={
              <Checkbox
                checked={formData.privileges.includes('Notarize a Document')}
              onChange={() => handleCheckboxChange('Notarize a Document')}
            />
            }
             label="Notarize A Document"
            sx={{ display: 'block' }} 
          />
        </Box>

        <Divider sx={{ mt: 2, mb: 2 }} />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.privileges.includes('Title Company')}
              onChange={() => handleCheckboxChange('Title Company')}
            />
          }
          label="Title Company"
          sx={{ display: 'block' }} 
        />


        <FormControlLabel
          control={
            <Checkbox
              checked={formData.privileges.includes('Notary Management')}
              onChange={() => handleCheckboxChange('Notary Management')}
            />
          }
          label="Notary Management"
          sx={{ display: 'block' }} 
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.privileges.includes('User Management')}
              onChange={() => handleCheckboxChange('User Management')}
            />
          }
          label="User Management"
          sx={{ display: 'block' }} 
        />
         <FormControlLabel
          control={
            <Checkbox
              checked={formData.privileges.includes('Services')}
              onChange={() => handleCheckboxChange('Services')}
            />
          }
          label="Services"
          sx={{ display: 'block' }} 
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.privileges.includes('Client Management')}
              onChange={() => handleCheckboxChange('Client Management')}
            />
          }
          label="Client Management"
          sx={{ display: 'block' }} 
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.privileges.includes('Menu Management')}
              onChange={() => handleCheckboxChange('Menu Management')}
            />
          }
          label="Menu Management"
          sx={{ display: 'block' }} 
        />
         <FormControlLabel
          control={
            <Checkbox
              checked={formData.privileges.includes('Notarization Logs')}
              onChange={() => handleCheckboxChange('Notarization Logs')}
            />
          }
          label="Notarization Logs"
          sx={{ display: 'block' }} 
        />
          
      </FormGroup>


      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;
