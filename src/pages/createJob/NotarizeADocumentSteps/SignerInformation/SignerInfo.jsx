import React, { useState } from 'react';
import {
  Box, Typography, Button, Grid
} from '@mui/material';
import AddSignerModal from '../SignerInformation/singerModal/singerModalForm';
import DynamicTable from '../../../../components/dynamicTable/dynamicTable';

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddSigner = (signer) => {
    setSigners([...signers, signer]);
  };

  const handleRemoveSigner = (index) => {
    setSigners(signers.filter((_, i) => i !== index));
  };

  return (
    <Grid container justifyContent="center">
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
            <Button
              variant="contained"
              color="primary"
              style={{ height: '25px', borderRadius: '5px', color: "#49beff"  }}
              startIcon={<span>+</span>}
              onClick={handleOpen}
              sx={{
                textTransform: 'none',
                bgcolor: 'white',
                color: '#ecf2ff',
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  bgcolor: 'white', 
                  color: '#49beff',
                },
              }}
            >
              Add Participant
            </Button>
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
