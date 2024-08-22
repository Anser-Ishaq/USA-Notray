import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

const JobDocs = () => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ width: '100%' }} style={{ marginTop: '40px' }}>
      <Grid item xs={12}>
        <Box width="100%">
          <Box
            bgcolor="#00b0ff"
            p={2}
            borderRadius="8px 8px 0 0"
            width="100%"
          >
            <Typography variant="h6" color="white">
              Upload Document(s)
            </Typography>
          </Box>

          <Box 
            mt={0}
            p={2}
            bgcolor="white"
            borderRadius="0 0 8px 8px"
            boxShadow={1}
            width="100%"
          >
            <Typography variant="body1" gutterBottom>
              Select document(s) to upload.
            </Typography>
            <Button
              variant="outlined"
              component="label"
              sx={{
                backgroundColor: 'white',
                color: 'black',
                borderColor: 'lightgrey',
                padding: '10px 20px',
                fontSize: { xs: '14px', sm: '16px' },
                textTransform: 'none',
                width: '100%',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: { xs: 1, sm: 2 }
              }}
            >
              Choose Files
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {fileName && (
              <Typography variant="body2" mt={2} sx={{ wordWrap: 'break-word' }}>
                Selected file: {fileName}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default JobDocs;
