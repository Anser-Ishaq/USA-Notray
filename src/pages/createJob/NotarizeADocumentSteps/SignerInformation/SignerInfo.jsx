import React, { useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Grid
} from '@mui/material';
import AddSignerModal from '../SignerInformation/singerModal/singerModalForm';

const SignerInfo = () => {
  const [open, setOpen] = useState(false);
  const [signers, setSigners] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddSigner = (signer) => {
    setSigners([...signers, signer]);
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

          <TableContainer component={Paper} sx={{ mt: 2, width: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {signers.map((signer, index) => (
                  <TableRow key={index}>
                    <TableCell>{signer.signerName}</TableCell>
                    <TableCell>{signer.signerEmail}</TableCell>
                    <TableCell>{signer.phoneNumber}</TableCell>
                    <TableCell>{signer.role}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="secondary">Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignerInfo;
