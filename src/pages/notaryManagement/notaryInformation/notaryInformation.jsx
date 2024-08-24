import React from 'react'
import {
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Typography,
    Divider,
    TextareaAutosize,
} from '@mui/material'
import DatePickerComp from '../../../components/DatePicker/DatePicker'
import Upload from '../../../components/Upload/Upload'

const NotaryInformation = () => {

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Notary Information
            </Typography>
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Full Name" variant="outlined" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Address 1" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Address 2" variant="outlined" />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <TextField fullWidth label="City" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>State</InputLabel>
                            <Select label="State">
                                <MenuItem value="CA">California</MenuItem>
                                <MenuItem value="NY">New York</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField fullWidth label="Zip Code" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Time Zone</InputLabel>
                            <Select label="Time Zone">
                                <MenuItem value="PST">Pacific Time (PST)</MenuItem>
                                <MenuItem value="EST">Eastern Time (EST)</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField fullWidth label="Contact Number" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth label="Email Address" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Create Password"
                            type="password"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Divider style={{ margin: '20px 0' }} />

                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={12}
                        flexDirection={'row'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Grid item xs={3.5}>
                            <Upload label="Signature JPG" />
                        </Grid>
                        <Grid item xs={3.5}>
                            <Upload label="Initials JPG" />
                        </Grid>
                        <Grid item xs={3.5}>
                            <Upload label="Seal" />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <TextareaAutosize
                            minRows={3}
                            placeholder="Disclosure"
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '4px',
                                borderColor: '#c4c4c4',
                                borderWidth: 1,
                            }}
                        />
                    </Grid>
                </Grid>

                <Divider style={{ margin: '20px 0' }} />

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Commission ID Number" variant="outlined" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Commission State</InputLabel>
                            <Select label="Commission State">
                                <MenuItem value="CA">California</MenuItem>
                                <MenuItem value="NY">New York</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Upload label={'Commission Expiration Date '} />
                    </Grid>

                    <Grid item xs={12} md={6} marginTop={'35px'}>
                        <DatePickerComp />
                    </Grid>
                </Grid>

                <Grid container justifyContent="flex-end" style={{ marginTop: '20px' }}>
                    <Button variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>
            </form>
        </div>
    )
}

export default NotaryInformation
