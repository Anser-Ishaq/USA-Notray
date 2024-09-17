import React, { useState, useEffect } from 'react'
import {
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    Paper,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Chip,
} from '@mui/material'
import Stack from '@mui/material/Stack'
import NotaryDetails from '../../../components/NotaryDetails/NotaryDetails'
import DatePickerComp from '../../../components/DatePicker/DatePicker'
import JobTime from '../../../components/JobTime/JobTime'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import ParticipantInfo from '../JobComponent/ParticipantInfo'
import { useId } from '../../../ContextHooks/JobContext/JobDetails'
import axios from 'axios'
import { alpha } from '@mui/material/styles'
import { closingTypeOptions } from '../../../Data/OptionValues'

const NotaryRefButtons = () => {
    const [showAdditionalButtons, setShowAdditionalButtons] = useState(false)
    const [jobStatus, setJobStatus] = useState('');

    const updateJobStatus = async (JobStatus) => {
        const job = JSON.parse(localStorage.getItem('jobData'));
        if (!job) {
            alert('No job data found!');
            return;
        }
    
        let newStatus = JobStatus === 'Completed' ? 'Completed' : 'Accepted'; // Based on button click
    
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/jobs/${job._id}/updatejobstatus`,
                { JobStatus: newStatus }
            );
    
            // alert(response.data.message);
    
            // Directly update local storage and jobStatus using the response data
            const updatedJobData = response.data.job;
            localStorage.setItem('jobData', JSON.stringify(updatedJobData));
    
            // Update state directly from the response to avoid delay
            setJobStatus(updatedJobData.JobStatus);
    
            // Show additional buttons if needed
            setShowAdditionalButtons(true);
    
            console.log('Job status updated:', response.data);
    
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred while updating the job status');
            console.error('Error updating job status:', error);
        }
    };

    const handleStartTagging = () => {
        alert('Starting Tagging...')

        const jobData = JSON.parse(localStorage.getItem('jobData'))

        if (jobData) {
            const url = `${import.meta.env.VITE_EDITOR_BASE_URL}/templatecreation/${jobData._id}`
            window.location.href = url
            localStorage.setItem('jobData', JSON.stringify(jobData?.job))
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const jobData = JSON.parse(localStorage.getItem('jobData'));  // Fetch data from localStorage
            if (jobData?.JobStatus) {
                setJobStatus(jobData.JobStatus);  // Set the job status if available
            }
        }, 1000); // Run every 3 seconds
    
        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(intervalId);
    }, []); 

    return (
        <>
            <Grid item xs={12} md={12}>
                <Box
                    sx={{
                        mb: 2,
                        borderRadius: '4px',
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: '#ffffff',
                            color: 'black',
                            p: 2,
                            borderRadius: '4px 4px 0 0',
                        }}
                    >
                        <Typography variant="h6">Job Status: </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                justifyContent: 'flex-end',
                                marginBottom: '10px',
                            }}
                        >
                            {jobStatus === 'Accepted' || jobStatus === 'Completed' || showAdditionalButtons ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#28A745',
                                            color: 'white',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            '&:hover': {
                                                backgroundColor: '#218838',
                                            },
                                        }}
                                        onClick={handleStartTagging}
                                    >
                                        <Typography variant="button">Start Tagging</Typography>
                                    </Button>

                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#17A2B8',
                                            color: 'white',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            '&:hover': {
                                                backgroundColor: '#138496',
                                            },
                                        }}
                                        onClick={() => alert('Starting Notarization...')}
                                    >
                                        <Typography variant="button">Start Notarization</Typography>
                                    </Button>
                                </Box>
                            ) : (
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
                                    onClick={() => updateJobStatus('Accepted')}
                                >
                                    <Typography variant="button">Accpet</Typography>
                                </Button>
                            )}

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
                                onClick={() => updateJobStatus('Cancelled')}
                            >
                                <Typography variant="button">Reject</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </>
    )
}

const SchedulingInfo = ({ selectedJob, onBack, stepperData, handleStepperData }) => {
    return (
        <Paper elevation={3} sx={{ borderRadius: '4px' }}>
            <Box
                sx={{
                    backgroundColor: '#5D87FF',
                    color: 'white',
                    p: 2,
                    borderRadius: '4px 4px 0 0',
                }}
            >
                <Typography variant="h6">Scheduling System</Typography>
            </Box>

            <Box mt={2} p={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Job Name"
                            value={selectedJob?.jobName || 'x'}
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            margin="normal"
                            sx={{ backgroundColor: '#EAEFF4', color: '#969BAC' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Internal Reference"
                            name="internalReference"
                            value={stepperData?.internalReference}
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            margin="normal"
                            sx={{ backgroundColor: '#EAEFF4', color: '#969BAC' }}
                        />
                    </Grid>

                    {/* Title Company */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Title Company"
                            name="titleCompany"
                            value={stepperData?.titleCompany}
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            margin="normal"
                            sx={{ backgroundColor: '#EAEFF4', color: '#969BAC' }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Closing Type"
                            name="closingType"
                            value={stepperData?.closingType}
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            margin="normal"
                            sx={{ backgroundColor: '#EAEFF4', color: '#969BAC' }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Property Address 1"
                            name="propertyAddressOne"
                            value={stepperData?.propertyAddressOne}
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            margin="normal"
                            sx={{ backgroundColor: '#EAEFF4', color: '#969BAC' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Property Address 2"
                            name="propertyAddressTwo"
                            value={stepperData?.propertyAddressTwo}
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            margin="normal"
                            sx={{ backgroundColor: '#EAEFF4', color: '#969BAC' }}
                        />
                    </Grid>

                    {/* Property City, State, and Zip Code */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Property City"
                            name="propertyCity"
                            value={stepperData?.propertyCity}
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            margin="normal"
                            sx={{ backgroundColor: '#EAEFF4', color: '#969BAC' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Property State"
                            name="propertyState"
                            value={stepperData?.propertyState}
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            margin="normal"
                            sx={{ backgroundColor: '#EAEFF4', color: '#969BAC' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Property Zip Code"
                            name="propertyZipCode"
                            value={stepperData?.propertyZipCode}
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            margin="normal"
                            sx={{ backgroundColor: '#EAEFF4', color: '#969BAC' }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}

const NotaryAndBilling = ({ selectedJob, dynamicJob }) => {
    const [notaryName, setNotaryName] = useState()
    const [currentStatus, setCurrentStatus] = useState()

    const handelNotary = () => {
        const jobData = JSON.parse(localStorage.getItem('jobData'))
        console.log('job data from billing')
        const NotaryName = jobData?.selectedNotary || dynamicJob?.selectedNotary || ''
        const jobStatus = jobData?.JobStatus || dynamicJob?.JobStatus || ''
        console.log('notary name from billing', NotaryName)
        setNotaryName(NotaryName)
        setCurrentStatus(jobStatus)
    }
    useEffect(() => {
        if (dynamicJob) {
            handelNotary()
        }
    }, [dynamicJob])

    return (
        <>
            <Grid item xs={12} md={4}>
                <Box
                    sx={{
                        height: '45%',
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
                        <Typography variant="h6">Notary</Typography>
                    </Box>
                    <Box sx={{ mb: 2, p: 2 }}>
                        <Typography variant="body2" py={1}>
                            <strong>Notary:</strong>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                            {notaryName || 'x'}
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center' }} py={1}>
                            <Typography variant="body2">
                                <strong>Response:</strong>
                            </Typography>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Chip
                                label={currentStatus}
                                sx={{
                                    backgroundColor: '#ECF2FF',
                                    color: '#5D87FF',
                                    fontWeight: 'bold',
                                }}
                            />
                        </div>
                    </Box>
                </Box>

                <Box
                    sx={{
                        height: '45%',
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
                        <Typography variant="h6">Billing</Typography>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="body2" py={0.5}>
                            <strong>Service Price:</strong>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $90.00
                        </Typography>
                        <Typography variant="body2" py={0.5}>
                            <strong>Witnesses Price:</strong>&nbsp;&nbsp;&nbsp; $0.00
                        </Typography>
                        <Typography variant="body2" fontWeight={'bold'} py={0.5}>
                            <strong>Total Price:</strong>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            $90.00
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </>
    )
}

const JobDate = ({ stepperData, handleStepperData,dynamicJob }) => {
    const [initialSelectedDate, setInitialSelectedDate] = useState(null)
    const [notaryName, setNotaryName] = useState()


    const handelNotary = () => {
        const jobData = JSON.parse(localStorage.getItem('jobData'))
        console.log('job data from billing')
        const NotaryName = jobData?.selectedNotary || dynamicJob?.selectedNotary || ''
        console.log('notary name from billing', NotaryName)
        setNotaryName(NotaryName)
 
    }
    useEffect(() => {
        if (dynamicJob) {
            handelNotary()
        }
    }, [dynamicJob])

    useEffect(() => {
        const jobData = JSON.parse(localStorage.getItem('jobData'))
        if (jobData && jobData.selectedDate) {
            setInitialSelectedDate(jobData.selectedDate)
        }
    }, [])
    return (
        <Grid item xs={12} md={4}>
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
                    <Typography variant="h6">Job Date and Notary</Typography>
                </Box>
                <Box sx={{ mb: 2, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Job Date
                    </Typography>
                    <DatePickerComp
                        stepperData={stepperData}
                        handleStepperData={handleStepperData}
                        initialSelectedDate={initialSelectedDate}
                    />
                    <br />
                    <NotaryDetails notaryName={notaryName}  />
                </Box>
            </Box>
        </Grid>
    )
}

const JobTimeComp = ({ stepperData, handleStepperData }) => {
    return (
        <Grid item xs={12} md={8}>
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
                    <Typography variant="h6">Job Time</Typography>
                </Box>
                <Box sx={{ mb: 2, p: 2 }}>
                    <JobTime
                        isStatic={true}
                        stepperData={stepperData}
                        handleStepperData={handleStepperData}
                    />
                </Box>
            </Box>
        </Grid>
    )
}

const ParticipantInfoComp = ({ stepperData, handleStepperData, dynamicJob }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [signerLocalData, setSignerLocalData] = useState([])

    const signerFromLocalStorage = () => {
        console.log('dynamicJob', dynamicJob)
        const jobData = JSON.parse(localStorage.getItem('jobData')) || {}
        const signers = jobData.signers || dynamicJob?.signers || []
        console.log('jobData from localStorage', jobData)
        if (signers.length === 0) {
            console.log('No signers found')
            setSignerLocalData([])
            return
        }

        const transformedData = signers.map((signer) => ({
            Name: signer.signerName || 'N/A',
            Email: signer.signerEmail || 'N/A',
            Phone: signer.signerPhoneNumber || 'N/A',
            Role: signer.signerRole || 'N/A',
            Status: (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Chip
                        label="Confirmed"
                        sx={{
                            backgroundColor: '#ECF2FF',
                            color: '#5D87FF',
                            fontWeight: 'bold',
                            padding: '10px',
                            fontSize: '12px',
                            marginBottom: '5px',
                        }}
                    />
                    <Chip
                        label="ID Bypass"
                        sx={{
                            backgroundColor: '#E6FFFA',
                            color: '#13DEB9',
                            fontWeight: 'bold',
                            padding: '10px',
                            fontSize: '12px',
                        }}
                    />
                </div>
            ),
        }))

        console.log('Transformed data', transformedData)
        setSignerLocalData(transformedData)
    }

    const filteredJobs = signerLocalData?.filter((job) =>
        [job.Name, job.Email, job.Role].some((field) =>
            field.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    )

    const renderActionButton = (row, index) => (
        <>
            <span> - </span>
        </>
    )
    const columns = [
        { id: 'Name', label: 'Name' },
        { id: 'Email', label: 'Email' },
        { id: 'Phone', label: 'Phone' },
        { id: 'Role', label: 'Role' },
        { id: 'Status', label: 'Status' },
        { id: 'actions', label: 'Action' },
    ]

    useEffect(() => {
        if (dynamicJob) {
            signerFromLocalStorage()
        }
    }, [dynamicJob])

    return (
        <ParticipantInfo
            setSearchQuery={setSearchQuery}
            filteredJobs={filteredJobs}
            header={"Participant's Information"}
            columns={columns}
            jobsData={signerLocalData}
            renderActionButton={renderActionButton}
            stepperData={stepperData}
            handleStepperData={handleStepperData}
        />
    )
}

const JobDocsComp = ({ dynamicJob }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [jobsData, setJobsData] = useState([])

    const docFromLocalStorage = () => {
        // Retrieve job data from localStorage or use the dynamicJob if available
        const jobData = JSON.parse(localStorage.getItem('jobData')) || {}
        const fileName =
            jobData?.uploadedFile?.split('/').pop() ||
            dynamicJob?.uploadedFile?.split('/').pop() ||
            'N/A'
        const createdAt = new Date(jobData?.createdAt || dynamicJob?.createdAt).toLocaleString()

        // Check if data exists, otherwise fallback to default values
        if (!jobData && !dynamicJob) {
            console.log('No job data available for transformation.')
            setJobsData([])
            return
        }

        const transformedData = [
            {
                DocumentName: fileName, // Extract the file name from the file path
                DateUploaded: createdAt, // Convert createdAt to readable format
                Status: (
                    <>
                        <Chip
                            label="Completed"
                            sx={{
                                backgroundColor: '#F6F9FC',
                                fontWeight: 'bold',
                                padding: '10px',
                                fontSize: '12px',
                                marginRight: '5px',
                            }}
                        />
                        <Chip
                            label="Signed"
                            sx={{
                                backgroundColor: '#F6F9FC',
                                fontWeight: 'bold',
                                padding: '10px',
                                fontSize: '12px',
                            }}
                        />
                    </>
                ),
            },
        ]

        // Update state with transformed data
        setJobsData(transformedData)
    }

    const renderActionButton = (row, index) => (
        <>
            <Box
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: '#FF4D4D',
                    color: 'white',
                    margin: 1,
                    cursor: 'pointer',
                }}
            >
                <DeleteForeverRoundedIcon fontSize="20px" onClick={() => handleRemove(index)} />
            </Box>

            <Box
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: '#4D79FF',
                    color: 'white',
                    margin: 1,
                    cursor: 'pointer',
                }}
            >
                <RemoveRedEyeRoundedIcon fontSize="20px" />
            </Box>

            <Box
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: '#4DFF4D',
                    color: 'white',
                    margin: 1,
                    cursor: 'pointer',
                }}
            >
                <DownloadRoundedIcon fontSize="20px" />
            </Box>
        </>
    )

    const filteredJobs = jobsData.filter((job) =>
        [job.DocumentName].some((field) => field.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    const columns = [
        { id: 'DocumentName', label: 'Document Name' },
        { id: 'DateUploaded', label: 'Date Uploaded' },
        { id: 'Status', label: 'Status' },
        { id: 'actions', label: 'Action' },
    ]

    useEffect(() => {
        if (dynamicJob) {
            docFromLocalStorage()
        }
    }, [dynamicJob])
    return (
        <ParticipantInfo
            setSearchQuery={setSearchQuery}
            filteredJobs={filteredJobs}
            header={'Job Documents'}
            columns={columns}
            jobsData={jobsData}
            renderActionButton={renderActionButton}
        />
    )
}

const AuditTrail = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const jobsData = [
        {
            timestamp: '2024-07-19 21:22:31',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY signature modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf',
        },
        {
            timestamp: '2024-07-19 21:22:32',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY signature modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf',
        },
        {
            timestamp: '2024-07-19 21:22:38',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY seal modified - Acknowledgment',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf',
        },
        {
            timestamp: '2024-07-19 21:22:39',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY seal modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf',
        },
        {
            timestamp: '2024-07-19 21:22:40',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY commission_exp_date modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf',
        },
        {
            timestamp: '2024-07-19 21:22:41',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY disclosure modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf',
        },
        {
            timestamp: '2024-07-19 21:22:42',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY disclosure modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf',
        },
        {
            timestamp: '2024-07-19 21:22:50',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY signature modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf',
        },
        {
            timestamp: '2024-07-19 21:22:51',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY signature modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf',
        },
        {
            timestamp: '2024-07-19 21:23:03',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY signature modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf',
        },
    ]

    const filteredJobs = jobsData.filter((job) =>
        [job.name, job.timestamp, job.ipAddress].some((field) =>
            field.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    )

    const renderActionButton = (row, index) => (
        <>
            <span> - </span>
        </>
    )
    const columns = [
        { id: 'timestamp', label: 'Date/Time' },
        { id: 'name', label: 'User' },
        { id: 'ipAddress', label: 'User IP' },
        { id: 'action', label: 'Action' },
        { id: 'document', label: 'Document' },
    ]
    return (
        <ParticipantInfo
            isAudit={true}
            setSearchQuery={setSearchQuery}
            filteredJobs={filteredJobs}
            header={'Audit Trail'}
            columns={columns}
            jobsData={jobsData}
            renderActionButton={renderActionButton}
        />
    )
}

const SessionRecording = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const jobsData = [
        {
            id: '1',
            recording: '02b6b4a3-daf5-4260-9ef3-a5b12a64b1e6',
            size: '30',
        },
    ]

    const filteredJobs = jobsData.filter((job) =>
        [job.id, job.recording, job.size].some((field) =>
            field.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    )

    const renderActionButton = (row, index) => (
        <Box
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 30,
                height: 30,
                borderRadius: '50%',
                backgroundColor: '#4DFF4D',
                color: 'white',
                margin: 1,
                cursor: 'pointer',
            }}
        >
            <DownloadRoundedIcon fontSize="20px" />
        </Box>
    )
    const columns = [
        { id: 'id', label: '#' },
        { id: 'recording', label: 'Recording' },
        { id: 'size', label: 'Size(MBs)' },
        { id: 'actions', label: 'Action' },
    ]
    return (
        <ParticipantInfo
            setSearchQuery={setSearchQuery}
            filteredJobs={filteredJobs}
            header={'Session Recordings'}
            columns={columns}
            jobsData={jobsData}
            renderActionButton={renderActionButton}
        />
    )
}

const DocLayout = ({ selectedJob, onBack }) => {
    const { id } = useId()
    const user = JSON.parse(localStorage.getItem('user'))
    const [dynamicSigner, setDynamicSigner] = useState()
    const [roleChecker, setRoleChecker] = useState(false)
    const JobStatus = 'Pending'
    const [stepperData, setStepperData] = useState({
        titleCompany: '',
        closingType: '',
        internalReference: '',
        kbaRequired: '',
        propertyAddressOne: '',
        propertyAddressTwo: '',
        propertyCity: '',
        propertyState: '',
        propertyZipCode: '',

        //signer data
        signers: [],

        //user
        userId: user._id,

        //status
        JobStatus: JobStatus,

        //scheduler data
        notaryOption: '',
        selectedNotary: '',
        selectedDate: '',
        selectedTime: '',

        //job docs
        uploadedFile: '',
    })

    const handleStepperData = (e) => {
        const { name, value } = e.target
        console.log('name, value', name, value)

        setStepperData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const fetchJobById = async () => {
        try {
            const dynamicId = id || JSON.parse(localStorage.getItem('jobData'))?._id
            if (!dynamicId) {
                console.error('No valid ID found for fetching job details.')
                alert('No valid ID found for fetching job details.')
                return
            }
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/jobs/getjobsByid/${dynamicId}`,
            )

            const jobData = response?.data?.job
            if (Array.isArray(jobData?.signers)) {
                localStorage.setItem('jobData', JSON.stringify(jobData))
                setStepperData((prevData) => ({
                    ...prevData,
                    ...jobData, // Assuming the job data matches the state fields
                }))
                setDynamicSigner(jobData)
            }
            localStorage.setItem('jobData', JSON.stringify(response.data.job))
        } catch (error) {
            console.log('error: ' + error)
        }
    }

    const checkUserRole = () => {
        if (user?.role === 'Notary Users') {
            setRoleChecker(true)
        }
    }

    useEffect(() => {
        fetchJobById()
        checkUserRole()
    }, [id])

    return (
        <Grid container spacing={2}>
            {roleChecker && <NotaryRefButtons />}
            <Grid item xs={12} md={8}>
                <SchedulingInfo
                    selectedJob={selectedJob}
                    onBack={onBack}
                    handleStepperData={handleStepperData}
                    stepperData={stepperData}
                />
            </Grid>
            <NotaryAndBilling
                dynamicJob={dynamicSigner}
                selectedJob={selectedJob}
                handleStepperData={handleStepperData}
                stepperData={stepperData}
            />
            <JobDate dynamicJob={dynamicSigner}  handleStepperData={handleStepperData} stepperData={stepperData} />
            <JobTimeComp handleStepperData={handleStepperData} stepperData={stepperData} />
            <ParticipantInfoComp
                dynamicJob={dynamicSigner}
                handleStepperData={handleStepperData}
                stepperData={stepperData}
            />
            <JobDocsComp
                dynamicJob={dynamicSigner}
                handleStepperData={handleStepperData}
                stepperData={stepperData}
            />
            <AuditTrail handleStepperData={handleStepperData} stepperData={stepperData} />
            <SessionRecording handleStepperData={handleStepperData} stepperData={stepperData} />
        </Grid>
    )
}

export default DocLayout
