import { Button, Chip, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import Search from '../../../components/Search/search'
import DynamicTable from '../../../components/dynamicTable/dynamicTable'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'

const ParticipantInfo = ({jobsData, renderActionButton, columns, header, filteredJobs, setSearchQuery, isAudit,stepperData, handleStepperData }) => {
    return (
        <Grid item xs={12} md={12}>
            <Box
                sx={{
                    mb: 2,
                    borderRadius: '4px',
                    boxShadow: 1,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#5D87FF',
                        color: 'white',
                        p: 2,
                        borderRadius: '4px 4px 0 0',
                    }}
                >
                    <Typography variant="h6">{header}</Typography>
                </Box>
                <Box sx={{ mb: 2, p: 2 }}>
                    {
                        isAudit && (
                            <Box sx={{ display: 'flex', gap: 2 , justifyContent: "flex-end", marginBottom: "10px"}}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#007BFF', 
                                    color: 'white',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    '&:hover': {
                                        backgroundColor: '#0056b3', 
                                    },
                                }}
                            >
                                <DownloadRoundedIcon />
                                <Typography variant="button">Download Audit Trail</Typography>
                            </Button>
                    
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#007BFF',
                                    color: 'white',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    '&:hover': {
                                        backgroundColor: '#0056b3', 
                                    },
                                }}
                            >
                                <DownloadRoundedIcon />
                                <Typography variant="button">Download Audit Logs</Typography>
                            </Button>
                        </Box>
                    
                        )
                    }
                <Search handleSearch={(e) => setSearchQuery(e.target.value)} />

                    <DynamicTable
                        actionButton={renderActionButton}
                        columns={columns}
                        data={filteredJobs}
                        stepperData={stepperData}
                        handleStepperData={handleStepperData}
                    />
                </Box>
            </Box>
        </Grid>
    )
}

export default ParticipantInfo
