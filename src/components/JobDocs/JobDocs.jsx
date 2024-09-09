import React, { useState } from 'react'
import { Box, Typography, Button, Grid } from '@mui/material'
import Upload from '../Upload/Upload'

const JobDocs = ({stepperData, handleStepperData}) => {
    return (
        <Grid
            container
            justifyContent="center"
            sx={{ width: '100%' }}
            style={{ marginTop: '40px' }}
        >
            <Grid item xs={12}>
                <Box width="100%">
                    <Box bgcolor="#00b0ff" p={2} borderRadius="8px 8px 0 0" width="100%">
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
                        <Upload label={'Select document(s) to upload.'} stepperData={stepperData} handleStepperData={handleStepperData} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default JobDocs
