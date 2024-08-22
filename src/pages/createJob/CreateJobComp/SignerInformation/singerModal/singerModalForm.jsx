import React, { useState } from 'react';
import {
  Box, Button, Modal, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Typography, Slide, useTheme, useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddSignerModal = ({ open, handleClose, onAddSigner }) => {
  const [signerName, setSignerName] = useState('');
  const [signerEmail, setSignerEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAdd = () => {
    if (!signerName || !signerEmail || !phoneNumber || !role) {
      setError('All fields are required');
      return;
    }

    setError('');
    const signer = { signerName, signerEmail, phoneNumber, role };

    onAddSigner(signer);

    setSignerName('');
    setSignerEmail('');
    setPhoneNumber('');
    setRole('');

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
          
          <Typography variant="h6" sx={{ backgroundColor: theme.palette.primary.main, color: 'white', padding: '12px', borderRadius: '1px', }}>
            Add Signer
          </Typography>

          <Box component="form" sx={{ p: 2 }}>
            <TextField 
              fullWidth 
              label="Signer Name" 
              variant="outlined" 
              margin="normal" 
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              required
              error={!!error}
              helperText={error && "Please fill all required fields"}
              sx={{ mb: 2 }} 
            />

            <TextField 
              fullWidth 
              label="Signer Email" 
              variant="outlined" 
              margin="normal" 
              value={signerEmail}
              onChange={(e) => setSignerEmail(e.target.value)}
              required
              error={!!error}
              helperText={error && "Please fill all required fields"}
              sx={{ mb: 2 }}
            />

            <TextField 
              fullWidth 
              label="Phone Number" 
              variant="outlined" 
              margin="normal" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              error={!!error}
              helperText={error && "Please fill all required fields"}
              sx={{ mb: 2 }} 
            />

            <FormControl fullWidth variant="outlined" margin="normal" required>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
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
