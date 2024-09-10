import React, { useState, useEffect } from 'react'
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
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useId } from '../../ContextHooks/JobContext/JobDetails'
 
const Jobs = () => {
    // State management
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedJob, setSelectedJob] = useState(null)
    const [selectedFilter, setSelectedFilter] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')
    const [jobData, setJobData] = useState([])
    const token = localStorage.getItem('token')
    const { setIdHandler } = useId();
    const navigate = useNavigate()


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
        { id: 'internalReference', label: 'Job Name' },
        { id: 'titleCompany', label: 'Title Company' },
        { id: 'closingType', label: 'Closing Type' },
        { id: 'schedule', label: 'Schedule' },
        { id: 'documents', label: 'Documents' },
        { id: 'status', label: 'Status' },
        { id: 'action', label: 'Action' },
    ]

    const jobDataColumns = [
        { id: 'id', label: '#' }, // Display row number
        { id: 'fileName', label: 'Job Name' },
        { id: 'titleCompany', label: 'Title Company' },
        { id: 'closingType', label: 'Closing Type' },
        { id: 'schedule', label: 'Schedule' },
        { id: 'documentPresence', label: 'Documents' }, // Show document count or N/A
        { id: 'JobStatus', label: 'Status' },
        { id: 'actions', label: 'Action' },
    ]

    // Handle dialog open and close
    const handleOpenDialog =   (job) => {
        console.log("selected job: " + job._id)
        setIdHandler(job._id);
        navigate(`/job-view/${job._id}`) 
        setSelectedJob(job)
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

    const formatSchedule = (time, date) => {
        if (!time || !date) return 'N/A'

        // Format the time
        const [startTime, endTime] = time.split('-')
        const formattedTime = `${startTime.trim()} - ${endTime.trim()}`

        // Format the date using plain JavaScript
        const dateObj = new Date(date)
        const year = dateObj.getFullYear()
        const month = String(dateObj.getMonth() + 1).padStart(2, '0') // Month is 0-based
        const day = String(dateObj.getDate()).padStart(2, '0')
        const formattedDate = `${year}-${month}-${day}`

        return `${formattedTime} ${formattedDate}`
    }

    const fetchJobData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/jobs/getjobs`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const formattedData = response.data.map((job, index) => ({
                ...job,
                id: index + 1,
                schedule: formatSchedule(job.selectedTime, job.selectedDate),
                uploadedFile: job.uploadedFile ? job.uploadedFile : 'N/A',
                fileName: job.uploadedFile ? job.uploadedFile.split('/').pop() : 'N/A', 
                documentPresence: job.uploadedFile ? '1' : 'N/A',
            }))
            setJobData(formattedData)
        } catch (error) {
            console.error('Error fetching job data:', error) 
        }
    }

    useEffect(() => {
        fetchJobData()
    }, [token])
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
                        columns={jobDataColumns}
                        data={jobData}
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
                                        <strong>Job Name:</strong> {selectedJob.internalReference}
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
                                        <strong>Documents:</strong> {selectedJob.uploadedFile }
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Status:</strong> {selectedJob.JobStatus}
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
