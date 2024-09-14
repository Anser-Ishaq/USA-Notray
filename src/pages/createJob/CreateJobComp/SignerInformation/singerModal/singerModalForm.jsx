import React, { useState } from 'react';
import {
  Box, Button, Modal, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Typography, Slide, useTheme, useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddSignerModal = ({ open, handleClose, onAddSigner, stepperData, handleStepperData }) => {
  const [signerData, setSignerData] = useState({
    signerName: '',
    signerEmail: '',
    signerPhoneNumber: '',
    signerRole: '',
  });
  const [error, setError] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check for empty fields and valid email format
    if (!signerData.signerName || !signerData.signerEmail || !signerData.signerPhoneNumber || !signerData.signerRole) {
        setError('All fields are required');
        return;
    }

    if (!emailPattern.test(signerData.signerEmail)) {
      alert('Please enter a valid email address (e.g., example@gmail.com)')
        setError('Please enter a valid email address (e.g., example@gmail.com)');
        return;
    }


    setError('');
    onAddSigner(signerData); // Pass the new signer data to the parent

    // Clear the form fields
    setSignerData({
      signerName: '',
      signerEmail: '',
      signerPhoneNumber: '',
      signerRole: '',
    });

    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            width: { xs: '90%', sm: 400, md: 500 },
            backgroundColor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
            position: 'relative',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >

          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: '8px',
              right: '16px',
              color: 'text.secondary'
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" sx={{ backgroundColor: theme.palette.primary.main, color: 'white', padding: '12px', borderRadius: '1px' }}>
            Add Signer
          </Typography>

          <Box component="form" sx={{ p: 2 }}>
            <TextField
              fullWidth
              label="Signer Name"
              variant="outlined"
              margin="normal"
              name='signerName'
              value={signerData.signerName}
              onChange={handleInputChange}
              required
              error={!!error}
              helperText={error && !signerData.signerName ? "Name is required" : ''}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Signer Email"
              variant="outlined"
              margin="normal"
              name='signerEmail'
              value={signerData.signerEmail}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
              error={!!error}
              helperText={error && !signerData.signerEmail  ? "Email is required" : ''}
            />

            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              margin="normal"
              name='signerPhoneNumber'
              value={signerData.signerPhoneNumber}
              onChange={handleInputChange}
              required
              error={!!error}
              helperText={error && !signerData.signerPhoneNumber ? "Phone Number is required" : ''}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth variant="outlined" margin="normal" required>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                name='signerRole'
                value={signerData.signerRole}
                onChange={handleInputChange}
                error={!!error}
                aria-label="select-role"
              >
                <MenuItem value="Notary">Notary</MenuItem>
                <MenuItem value="Signer">Signer</MenuItem>
                <MenuItem value="Witness">Witness</MenuItem>
              </Select>
            </FormControl>

            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button onClick={handleClose} variant="outlined" sx={{ mr: 1 }}>Close</Button>
              <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
            </Box>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default AddSignerModal;
