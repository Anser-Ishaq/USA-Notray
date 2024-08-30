import React, { useState } from 'react'
import {
    Box,
    Typography,
    Grid,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import FilterListIcon from '@mui/icons-material/FilterList'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import JobFilterButtons from '../../components/dynamicButtons/dynamicButtons'
import DynamicTable from '../../components/dynamicTable/dynamicTable'
import jobsData from './data'
import Heading from '../../components/Heading/heading'
import Search from '../../components/Search/search'

const Jobs = () => {
    // State management
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedJob, setSelectedJob] = useState(null)
    const [selectedFilter, setSelectedFilter] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')

    // Filter options with corresponding icons
    const filterBtn = ['All', 'Open', 'Pending', 'Completed', 'Cancelled', 'Expired']
    const icons = {
        All: <FilterListIcon />,
        Open: <LockOpenIcon />,
        Pending: <AccessTimeIcon />,
        Completed: <CheckCircleIcon />,
        Cancelled: <CancelIcon />,
        Expired: <HourglassEmptyIcon />,
    }

    // Table column definitions
    const columns = [
        { id: 'id', label: '#' },
        { id: 'jobName', label: 'Job Name' },
        { id: 'titleCompany', label: 'Title Company' },
        { id: 'closingType', label: 'Closing Type' },
        { id: 'schedule', label: 'Schedule' },
        { id: 'documents', label: 'Documents' },
        { id: 'status', label: 'Status' },
        { id: 'action', label: 'Action' },
    ]

    // Handle dialog open and close
    const handleOpenDialog = (job) => {
        setSelectedJob(job)
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
        setSelectedJob(null)
    }

    // Handle filter change
    const handleFilterChange = (filter) => {
        setSelectedFilter(filter)
    }

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    // Apply selected filters and search term
    const filteredJobs = jobsData
        .filter((job) => selectedFilter === 'All' || job.status === selectedFilter)
        .filter((job) => job.id.toString().includes(searchTerm))

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
                        <Heading heading="All Jobs List" />
                        <Box display="flex" alignItems="center">
                            <JobFilterButtons
                                filters={filterBtn}
                                selectedFilter={selectedFilter}
                                onSelectFilter={handleFilterChange}
                                icons={icons}
                            />
                        </Box>
                    </Box>

                    {/* Search Field */}
                    <Box mt={2} display="flex" justifyContent="flex-end">
                    <Search handleSearch={handleSearchChange} />
                    </Box>


                    {/* Dynamic Table Displaying Jobs */}
                    <DynamicTable
                        columns={columns}
                        data={filteredJobs}
                        actionButton={(job) => (
                            <IconButton color="primary" onClick={() => handleOpenDialog(job)}>
                                <VisibilityIcon />
                            </IconButton>
                        )}
                    />

                    {/* Job Details Dialog */}
                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Job Details</DialogTitle>
                        <DialogContent>
                            {selectedJob ? (
                                <Box>
                                    <Typography variant="body1">
                                        <strong>Job Name:</strong> {selectedJob.jobName}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Title Company:</strong> {selectedJob.titleCompany}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Closing Type:</strong> {selectedJob.closingType}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Schedule:</strong> {selectedJob.schedule}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Documents:</strong> {selectedJob.documents}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Status:</strong> {selectedJob.status}
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography>No job selected</Typography>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Jobs
