import React, { useState } from 'react';
import {
  Box, Typography, Grid
} from '@mui/material';
import AddSignerModal from '../SignerInformation/singerModal/singerModalForm';
import DynamicTable from '../../../../components/dynamicTable/dynamicTable'; 
import { AddParticipant } from '../../../../components/DynamicButton/DynamicButton';
import AddIcon from '@mui/icons-material/Add'; // Import the icon for the button

const SignerInfo = () => {
  const [open, setOpen] = useState(false);
  const [signers, setSigners] = useState([]);

  const columns = [
    { id: 'signerName', label: 'Name' },
    { id: 'signerEmail', label: 'Email' },
    { id: 'phoneNumber', label: 'Phone' },
    { id: 'role', label: 'Role' },
    { id: 'actions', label: 'Action' }
  ];

  const handleOpen = () => {
    console.log('Modal Opened'); // Debugging statement
    setOpen(true);
  };

  const handleClose = () => {
    console.log('Modal Closed'); // Debugging statement
    setOpen(false);
  };

  const handleAddSigner = (signer) => {
    console.log('Signer Added:', signer); // Debugging statement
    setSigners([...signers, signer]);
  };

  const handleRemoveSigner = (index) => {
    console.log('Remove Signer at index:', index); // Debugging statement
    setSigners(signers.filter((_, i) => i !== index));
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: '40px' }}>
      <Grid item xs={12}>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="#00b0ff"
            p={2}
            flexDirection={{ xs: 'column', sm: 'row' }}
            borderRadius="4px"
          >
            <Typography variant="h6" color="white" mb={{ xs: 1, sm: 0 }}>
              Participant's Information
            </Typography>
            
            <AddParticipant icon={AddIcon} onClick={handleOpen}>
              Add Participant
            </AddParticipant>
          </Box>

          <AddSignerModal open={open} handleClose={handleClose} onAddSigner={handleAddSigner} />

          <DynamicTable
            columns={columns}
            data={signers}
            onRemove={handleRemoveSigner}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignerInfo;
