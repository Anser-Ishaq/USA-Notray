import React, { useState } from 'react'
import QuantityInput from '../../../../components/NumberInput/NumberInput'
import {
    Grid,
    Paper,
    Button,
    Box,
    Typography,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    IconButton,
    Select,
    MenuItem,
} from '@mui/material'
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material'
import AddParticipant from '../../../../components/DynamicButton/DynamicButton'

const columns = [
    { id: 'Name', label: 'Name', xs: 1.5 },
    { id: 'Email', label: 'Email', xs: 1.5 },
    { id: 'Phone', label: 'Phone', xs: 1.5 },
    { id: 'Role', label: 'Role', xs: 1.5 },
    { id: 'Same Location', label: 'Same Location', xs: 2 },
    { id: 'Same Time', label: 'Same Time', xs: 2 },
    { id: 'Action', label: 'Action', xs: 1 },
]

const ParticipantInfo = () => {
    // State to manage signers' information
    const [signers, setSigners] = useState([
        { name: '', email: '', phone: '', role: 'Main Signer', sameLocation: 'No', sameTime: 'No' },
    ])

    // Handle input change for signers
    const handleChange = (index, event) => {
        const { name, value } = event.target
        const newSigners = [...signers]
        newSigners[index][name] = value
        setSigners(newSigners)
    }

    // Add a new signer row
    const handleAddRow = () => {
        setSigners([
            ...signers,
            {
                name: '',
                email: '',
                phone: '',
                role: 'Main Signer',
                sameLocation: 'No',
                sameTime: 'No',
            },
        ])
    }

    // Remove a specific signer row
    const handleRemoveRow = (index) => {
        setSigners(signers.filter((_, i) => i !== index))
    }

    return (
        <div style={{ marginTop: '40px' }}>
            {/* Section for specifying the number of signers */}
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                >
                    <span style={{ marginBottom: '10px', fontSize: '1rem' }}>
                        1. How many signers are there?
                    </span>
                    <QuantityInput />
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                >
                    <span style={{ marginBottom: '20px', fontSize: '1rem' }}>
                        2. Are signers in different locations?
                    </span>
                    <RadioGroup row>
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </Grid>
            </Grid>

            {/* Section for displaying and managing signer information */}
            <Box marginTop={'20px'}>
                <Box display="flex" bgcolor="#00b0ff" p={2} borderRadius="4px">
                    <Typography variant="h6" color="white">
                        Signer Information
                    </Typography>
                </Box>

                <Paper elevation={1} style={{ padding: '5px' }}>
                    {/* Header for the table columns */}
                    <Grid container spacing={1} style={{ fontWeight: 'bold' }}>
                        {columns.map((column) => (
                            <Grid item xs={column.xs} key={column.id}>
                                <Typography variant="subtitle1">{column.label}</Typography>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Dynamic rows for each signer */}
                    {signers.map((signer, index) => (
                        <Grid
                            container
                            spacing={2}
                            key={index}
                            alignItems="center"
                            style={{ marginTop: '10px' }}
                        >
                            <Grid item xs={1.5}>
                                <TextField
                                    name="name"
                                    value={signer.name}
                                    onChange={(e) => handleChange(index, e)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={1.5}>
                                <TextField
                                    name="email"
                                    value={signer.email}
                                    onChange={(e) => handleChange(index, e)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={1.5}>
                                <TextField
                                    name="phone"
                                    value={signer.phone}
                                    onChange={(e) => handleChange(index, e)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Select
                                    name="role"
                                    value={signer.role}
                                    onChange={(e) => handleChange(index, e)}
                                    fullWidth
                                >
                                    <MenuItem value="Main Signer">Main Signer</MenuItem>
                                    <MenuItem value="Co-Signer">Co-Signer</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={2}>
                                <RadioGroup
                                    row
                                    name="sameLocation"
                                    value={signer.sameLocation}
                                    onChange={(e) => handleChange(index, e)}
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                >
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={2}>
                                <RadioGroup
                                    row
                                    name="sameTime"
                                    value={signer.sameTime}
                                    onChange={(e) => handleChange(index, e)}
                                >
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton
                                    color="secondary"
                                    onClick={() => handleRemoveRow(index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}

                    {/* Button to add a new signer */}
                    <AddParticipant icon={AddIcon} onClick={handleAddRow}>
                        Add Participant
                    </AddParticipant>
                </Paper>
            </Box>
        </div>
    )
}

export default ParticipantInfo
