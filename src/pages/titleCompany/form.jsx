import React from 'react'
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Box,
    Grid,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Divider,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { BackButton } from '../../components/DynamicButton/DynamicButton'
import { stateOptions, timeZones } from './data'
import Heading from '../../components/Heading/heading'

const UserForm = ({
    formData,
    setFormData,
    roles,
    privileges,
    handleSubmit,
    handleClose,
    handleCompanyData,
    editIndex,
}) => {
    const theme = useTheme()
    const handleFormSubmit = (e) => {
        e.preventDefault()
        handleSubmit()
    }
    console.log("handleFormSubmit", formData)

    return (
        <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{
                mt: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: { xs: '100%', md: '100%' },
                height: 'auto',
                padding: '30px',
                backgroundColor: theme.palette.background.paper,
                borderRadius: '8px',
                boxShadow: theme.shadows[2],
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <BackButton handleBack={handleClose} />
                </Grid>
                <Grid item xs={12}>
                    <Heading heading={'Title Company Information'} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        label="Company Name"
                        variant="outlined"
                        fullWidth
                        name="companyName"
                        placeholder="1 Source Title and Escrow, LLC"
                        value={formData.companyName}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        label="Preferred Notary ID"
                        variant="outlined"
                        fullWidth
                        name="preferredNotaryID"
                        placeholder="N-1-a5d26"
                        value={formData.preferredNotaryID}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        label="Company Address Line 1"
                        variant="outlined"
                        fullWidth
                        name="companyAddressLine1"
                        placeholder="1707 Orlando Central Parkway"
                        value={formData.companyAddressLine1}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        label="Company Address Line 2"
                        variant="outlined"
                        fullWidth
                        name="companyAddressLine2"
                        placeholder="Suite 301-A"
                        value={formData.companyAddressLine2}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        label="Company City"
                        variant="outlined"
                        fullWidth
                        name="companyCity"
                        placeholder="Orlando"
                        value={formData.companyCity}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Company State</InputLabel>
                        <Select
                            label="Company State"
                            name="companyState"
                            value={formData.companyState}
                            onChange={handleCompanyData}
                        >
                            {stateOptions.map((state) => (
                                <MenuItem key={state} value={state}>
                                    {state}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Company ZIP"
                        variant="outlined"
                        fullWidth
                        name="companyZIP"
                        placeholder="32809"
                        value={formData.companyZIP}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <TextField
                        label="Primary Contact Name"
                        variant="outlined"
                        fullWidth
                        name="primaryContactName"
                        placeholder="Becky Mead"
                        value={formData.primaryContactName}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <TextField
                        label="Primary Contact Number"
                        variant="outlined"
                        fullWidth
                        name="primaryContactNumber"
                        placeholder=".(615) 971-1962"
                        value={formData.primaryContactNumber}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={1} md={4}>
                    <TextField
                        label="Primary contact email address"
                        variant="outlined"
                        fullWidth
                        name="primaryContactEmailAddress"
                        placeholder="orders@1sourcetitle.com"
                        value={formData.primaryContactEmailAddress}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={12} md={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Time Zone</InputLabel>
                        <Select
                            label="Time Zone"
                            name="timeZone1"
                            value={formData.timeZone1}
                            onChange={handleCompanyData}
                        >
                            <MenuItem value=""></MenuItem>
                            {timeZones.map((zone, index) => (
                                <MenuItem key={index} value={zone}>
                                    {zone}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                    <TextField
                        label="Secondary Contact Name"
                        variant="outlined"
                        fullWidth
                        name="secondaryContactName"
                        placeholder="Enter Secondary contect Name"
                        value={formData.secondaryContactName}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <TextField
                        label="Secondary Contact Number"
                        variant="outlined"
                        fullWidth
                        name="secondaryContactNumber"
                        placeholder="Enter Secondary contect Number"
                        value={formData.secondaryContactNumber}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={1} md={4}>
                    <TextField
                        label="Secondary contact email address"
                        variant="outlined"
                        fullWidth
                        name="secondaryContactEmailAddress"
                        placeholder="Enter Secondary contect Email Address"
                        value={formData.secondaryContactEmailAddress}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={12} md={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Time Zone</InputLabel>
                        <Select
                            label="Time Zone"
                            name="timeZone2"
                            value={formData.timeZone2}
                            onChange={handleCompanyData}
                        >
                            <MenuItem value=""></MenuItem>
                            {timeZones.map((zone, index) => (
                                <MenuItem key={index} value={zone}>
                                    {zone}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                    <TextField
                        label="Third Contact Name"
                        variant="outlined"
                        fullWidth
                        name="thirdContactName"
                        placeholder="Enter Third Contact Name"
                        value={formData.thirdContactName}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <TextField
                        label="Third Contact Number"
                        variant="outlined"
                        fullWidth
                        name="thirdContactNumber"
                        placeholder="Enter Third Contact Number"
                        value={formData.thirdContactNumber}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={1} md={4}>
                    <TextField
                        label="Third contact email address"
                        variant="outlined"
                        fullWidth
                        name="thirdContactEmailAddress"
                        placeholder="Enter Third Contact Email Address"
                        value={formData.thirdContactEmailAddress}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={12} md={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Time Zone</InputLabel>
                        <Select
                            label="Time Zone"
                            name="timeZone3"
                            value={formData.timeZone3}
                            onChange={handleCompanyData}
                        >
                            <MenuItem value=""></MenuItem>
                            {timeZones.map((zone, index) => (
                                <MenuItem key={index} value={zone}>
                                    {zone}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                    <TextField
                        label="Fourth Contact Name"
                        variant="outlined"
                        fullWidth
                        name="fourthContactName"
                        placeholder="Enter Fourth Contact Name"
                        value={formData.fourthContactName}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <TextField
                        label="Fourth Contact Number"
                        variant="outlined"
                        fullWidth
                        name="fourthContactNumber"
                        placeholder="Enter Fourth Contact Number"
                        value={formData.fourthContactNumber}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={1} md={4}>
                    <TextField
                        label="Fourth contact email address"
                        variant="outlined"
                        fullWidth
                        name="fourthContactEmailAddress"
                        placeholder="Enter Fourth Contact Email Address"
                        value={formData.fourthContactEmailAddress}
                        onChange={handleCompanyData}
                    />
                </Grid>

                <Grid item xs={12} md={2}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Time Zone</InputLabel>
                        <Select
                            label="Time Zone"
                            name="timeZone4"
                            value={formData.timeZone4}
                            onChange={handleCompanyData}
                        >
                            <MenuItem value=""></MenuItem>
                            {timeZones.map((zone, index) => (
                                <MenuItem key={index} value={zone}>
                                    {zone}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.requireKBA}
                                onChange={handleCompanyData}
                                name="requireKBA"
                            />
                        }
                        label="Always Require Knowledge-based Authentication (KBA)?"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                        {editIndex ? 'Update' : 'Submit'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default UserForm
