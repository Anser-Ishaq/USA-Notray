import React, { useState } from 'react'
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
import NotaryDetails from '../../../components/NotaryDetails/NotaryDetails'
import DatePickerComp from '../../../components/DatePicker/DatePicker'
import JobTime from '../../../components/JobTime/JobTime'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import ParticipantInfo from '../JobComponent/ParticipantInfo'

const SchedulingInfo = ({ selectedJob, onBack }) => {
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
                            value={selectedJob?.internalReference || 'x'}
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
                            value={selectedJob?.titleCompany || 'x'}
                            InputProps={{ readOnly: true }}
                            variant="outlined"
                            margin="normal"
                            sx={{ backgroundColor: '#EAEFF4', color: '#969BAC' }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel id="closing-type-label">Closing Type</InputLabel>
                            <Select
                                labelId="closing-type-label"
                                value={selectedJob?.closingType || ''}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Closing Type' }}
                                renderValue={(value) => value || 'x'}
                                sx={{ backgroundColor: '#EAEFF4', color: '#969BAC' }}
                            >
                                <MenuItem value="">{selectedJob?.closingType || 'N/A'}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Property Address 1"
                            value={selectedJob?.propertyAddress1 || 'x'}
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
                            value={selectedJob?.propertyAddress2 || 'x'}
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
                            value={selectedJob?.propertyCity || 'x'}
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
                            value={selectedJob?.propertyState || 'x'}
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
                            value={selectedJob?.propertyZipCode || 'x'}
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

const NotaryAndBilling = ({ selectedJob }) => {
    return (
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
                        {selectedJob?.notaryName || 'x'}
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }} py={1}>
                        <Typography variant="body2">
                            <strong>Response:</strong>
                        </Typography>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Chip
                            label="Accepted"
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
    )
}

const JobDate = () => {
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
                    <DatePickerComp />
                    <br />
                    <NotaryDetails />
                </Box>
            </Box>
        </Grid>
    )
}

const JobTimeComp = () => {
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
                    <JobTime isStatic={true} />
                </Box>
            </Box>
        </Grid>
    )
}

const ParticipantInfoComp = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const jobsData = [
        {
            Name: 'bessie b. jones',
            Email: 'donaldebyrdjr@aol.com',
            Phone: '(301) 257-9529',
            Role: 'SIGNER',
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
        },
    ]

    const filteredJobs = jobsData.filter((job) =>
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
    return (
        <ParticipantInfo
            setSearchQuery={setSearchQuery}
            filteredJobs={filteredJobs}
            header={"Participant's Information"}
            columns={columns}
            jobsData={jobsData}
            renderActionButton={renderActionButton}
        />
    )
}

const JobDocsComp = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const jobsData = [
        {
            DocumentName: 'Notary Docs_Seller_4711 Kim Thomas.pdf',
            DateUploaded: '2024-07-19 21:15:43',
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
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf'
        },
        {
            timestamp: '2024-07-19 21:22:32',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY signature modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf'
        },
        {
            timestamp: '2024-07-19 21:22:38',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY seal modified - Acknowledgment',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf'
        },
        {
            timestamp: '2024-07-19 21:22:39',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY seal modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf'
        },
        {
            timestamp: '2024-07-19 21:22:40',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY commission_exp_date modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf'
        },
        {
            timestamp: '2024-07-19 21:22:41',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY disclosure modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf'
        },
        {
            timestamp: '2024-07-19 21:22:42',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY disclosure modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf'
        },
        {
            timestamp: '2024-07-19 21:22:50',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY signature modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf'
        },
        {
            timestamp: '2024-07-19 21:22:51',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY signature modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf'
        },
        {
            timestamp: '2024-07-19 21:23:03',
            name: 'Andrew Ray Yon',
            ipAddress: '172.56.3.64',
            action: 'NOTARY signature modified',
            document: 'Notary Docs_Seller_4711 Kim Thomas.pdf'
        }
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
            header={"Audit Trail"}
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
            header={"Session Recordings"}
            columns={columns}
            jobsData={jobsData}
            renderActionButton={renderActionButton}
        />
    )
}

const DocLayout = ({ selectedJob, onBack }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <SchedulingInfo selectedJob={selectedJob} onBack={onBack} />
            </Grid>
            <NotaryAndBilling selectedJob={selectedJob} />
            <JobDate />
            <JobTimeComp />
            <ParticipantInfoComp />
            <JobDocsComp />
            <AuditTrail />
            <SessionRecording />
        </Grid>
    )
}

export default DocLayout
