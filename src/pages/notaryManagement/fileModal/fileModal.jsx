import React from 'react';
import {
  Box, Button, Modal, IconButton, Typography, Slide, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Upload from '../../../components/Upload/Upload';


const FileModal = ({ open, handleClose }) => {
  const theme = useTheme();

  const rows = [
    { type: 'Signature', fileName: <InsertPhotoOutlinedIcon style={{color: "#5D87FF"}}/>, changeTo: <Upload /> },
    { type: 'Initials', fileName: <InsertPhotoOutlinedIcon style={{color: "#5D87FF"}}/>, changeTo: <Upload /> },
    { type: 'Commission Certificate', fileName: <DescriptionOutlinedIcon style={{color: "#FA8D70"}}/>, changeTo: <Upload /> },
    { type: 'Identrust Commission Certificate', fileName: <DescriptionOutlinedIcon style={{color: "#FA8D70"}}/>, changeTo: <Upload /> },
    { type: 'E&O Certificate', fileName: <DescriptionOutlinedIcon style={{color: "#FA8D70"}}/>, changeTo: <Upload /> },
    { type: 'Bond Certificate', fileName: <DescriptionOutlinedIcon style={{color: "#FA8D70"}}/>, changeTo: <Upload /> },
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto', 
      }}
    >
      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
        <Box 
          sx={{ 
            width: { xs: '90%', sm: 800, md: 900 }, 
            backgroundColor: 'background.paper', 
            borderRadius: '12px', 
            boxShadow: 24, 
            position: 'relative',
            height: '90vh',  
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
            Peta-Gaye Anderson - uploaded files
          </Typography>

          <Box sx={{ p: 2, overflowY: 'auto', flexGrow: 1 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: '35%', padding: '8px', borderRight: '1px solid #ddd', paddingLeft: "20px", color: "#5F6E88", fontWeight: "bold" }}>Type</TableCell>
                    <TableCell sx={{ width: '15%', padding: '8px', borderRight: '1px solid #ddd', textAlign: 'center', color: "#5F6E88", fontWeight: "bold" }}>File Name</TableCell>
                    <TableCell sx={{ width: '50%', padding: '8px', borderRight: '1px solid #ddd', color: "#5F6E88", fontWeight: "bold" }}>Change To</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ padding: '8px', borderRight: '1px solid #ddd', color: "#606F89", paddingLeft: "20px" }}>{row.type}</TableCell>
                      <TableCell sx={{ padding: '8px', borderRight: '1px solid #ddd', textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          {row.fileName}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ padding: '8px', borderRight: '1px solid #ddd' }}>{row.changeTo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button onClick={handleClose} variant="outlined" sx={{ mr: 1 }}>Close</Button>
              <Button variant="contained" color="primary">Save</Button>
            </Box>
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default FileModal;
