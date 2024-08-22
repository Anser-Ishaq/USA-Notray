import React, { useState } from 'react';
import {
  Box, Typography, Grid, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import JobFilterButtons from '../../components/dynamicButtons/dynamicButtons';

const Jobs = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const jobsData = [
    { id: 1, jobName: 'APEX-Jones-071924-418', titleCompany: 'Apex Settlement', closingType: 'Title Closing Seller Side', schedule: '17:30 - 18:00 2024-07-19', documents: 1, status: 'Completed' },
    { id: 2, jobName: 'LEGA-Hughes-071924-742', titleCompany: 'Legacy House Title', closingType: 'Title Closing Seller Side', schedule: '09:30 - 10:00 2024-07-22', documents: 0, status: 'Pending' },
    { id: 3, jobName: 'NATI-Lizell-071924-882', titleCompany: 'National Title Services', closingType: 'Title Closing Seller Side', schedule: '15:00 - 15:30 2024-07-19', documents: 1, status: 'Open' },
    { id: 4, jobName: 'EAST-Fenolosa-071924-969', titleCompany: 'Eastern Title and Settlement', closingType: 'Title Closing Seller Side', schedule: '15:00 - 15:30 2024-07-19', documents: 1, status: 'Cancelled' },
    { id: 5, jobName: 'EAST-Velasquez-071924-619', titleCompany: 'Eastern Title and Settlement', closingType: 'Title Closing Seller Side', schedule: '14:30 - 15:00 2024-07-19', documents: 1, status: 'Expired' }
  ];

  const columns = [
    { id: 'id', label: '#' },
    { id: 'jobName', label: 'Job Name' },
    { id: 'titleCompany', label: 'Title Company' },
    { id: 'closingType', label: 'Closing Type' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'documents', label: 'Documents' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action' }
  ];

  const handleOpenDialog = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter jobs by ID only
  const filteredJobs = jobsData
    .filter((job) =>
      selectedFilter === 'All' || job.status === selectedFilter
    )
    .filter((job) =>
      job.id.toString().includes(searchTerm)
    );

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            flexDirection={{ xs: 'column', sm: 'row' }}
            borderRadius="4px"
          >
            <Typography variant="h6" color="textPrimary" mb={{ xs: 1, sm: 0 }}>
              All Jobs List
            </Typography>

            <JobFilterButtons
              selectedFilter={selectedFilter}
              onSelectFilter={handleFilterChange}
            />
          </Box>
          
          <Box mt={2} display={'flex'} justifyContent={'flex-end'}>
            <TextField
              variant="outlined"
              placeholder="Search by Job ID"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Box>

          <TableContainer component={Paper} sx={{ mt: 2, width: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        {column.id === 'action' ? (
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenDialog(job)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        ) : (
                          job[column.id]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
          >
            <DialogTitle>Job Details</DialogTitle>
            <DialogContent>
              {selectedJob ? (
                <Box>
                  <Typography variant="body1"><strong>Job Name:</strong> {selectedJob.jobName}</Typography>
                  <Typography variant="body1"><strong>Title Company:</strong> {selectedJob.titleCompany}</Typography>
                  <Typography variant="body1"><strong>Closing Type:</strong> {selectedJob.closingType}</Typography>
                  <Typography variant="body1"><strong>Schedule:</strong> {selectedJob.schedule}</Typography>
                  <Typography variant="body1"><strong>Documents:</strong> {selectedJob.documents}</Typography>
                  <Typography variant="body1"><strong>Status:</strong> {selectedJob.status}</Typography>
                </Box>
              ) : (
                <Typography>No job selected</Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">Close</Button>
            </DialogActions>
          </Dialog>

        </Box>
      </Grid>
    </Grid>
  );
};

export default Jobs;
