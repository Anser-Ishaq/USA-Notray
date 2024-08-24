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
    Chip,
} from '@mui/material'
import DatePickerComp from '../../../components/DatePicker/DatePicker'
import Upload from '../../../components/Upload/Upload'
import Switch from '../../../components/Switch/Switch'

const NotaryInformation = ({ handleBack }) => {
    return (
        <div style={{ padding: '20px' }}>
            <Grid
                display={'flex'}
                justifyContent={'flex-start'}
                alignItems={'baseline'}
                flexDirection={'row'}
            >
                <Chip
                    onClick={handleBack}
                    label="Back"
                    sx={{
                        backgroundColor: '#5D87FF',
                        color: 'white',
                        marginRight: '20px',
                        cursor: 'pointer',
                    }}
                />
                <Typography variant="h5" gutterBottom style={{ marginBottom: '40px' }}>
                    Notary Information
                </Typography>
            </Grid>
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
                    <Grid item xs={12} container spacing={2} justifyContent="space-between">
                        <Grid item xs={12} md={3.5}>
                            <Upload label="Signature JPG" />
                        </Grid>
                        <Grid item xs={12} md={3.5}>
                            <Upload label="Initials JPG" />
                        </Grid>
                        <Grid item xs={12} md={3.5}>
                            <Upload label="Seal" />
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
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

                    <Grid item xs={12} md={9}>
                        <Upload label={'Commission Certificate'} />
                    </Grid>

                    <Grid item xs={12} md={3} marginTop={'5px'}>
                        <Typography variant="body1" gutterBottom>
                            Commission Expiration Date
                        </Typography>
                        <DatePickerComp />
                    </Grid>
                </Grid>

                <Divider style={{ margin: '20px 0' }} />

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Upload label={'Identrust Digital Certificate (File) '} />
                    </Grid>
                    <Grid item xs={12} md={4} marginTop={'5px'}>
                        <Typography variant="body1" gutterBottom>
                            Identrust Digital Certificate Expiration Date
                        </Typography>
                        <DatePickerComp />
                    </Grid>
                    <Grid item xs={12} md={4} marginTop={'33px'}>
                        <TextField
                            fullWidth
                            label="Identrust Digital Certificate Passphrase "
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Upload label={'E&O Certificate '} />
                    </Grid>
                    <Grid item xs={12} md={4} marginTop={'5px'}>
                        <Typography variant="body1" gutterBottom>
                            E&O Expiration Date
                        </Typography>
                        <DatePickerComp />
                    </Grid>
                    <Grid item xs={12} md={4} marginTop={'33px'}>
                        <TextField
                            fullWidth
                            label="Errors and Omissions Insurance Amount "
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Upload label={'Bond Certificate'} />
                    </Grid>
                    <Grid item xs={12} md={4} marginTop={'5px'}>
                        <Typography variant="body1" gutterBottom>
                            Bond Expiration Date
                        </Typography>
                        <DatePickerComp />
                    </Grid>
                    <Grid item xs={12} md={4} marginTop={'33px'}>
                        <TextField fullWidth label="Bond Amount" variant="outlined" />
                    </Grid>
                </Grid>

                <Divider style={{ margin: '20px 0' }} />

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" gutterBottom>
                            Are you a Certified Notary Signing Agent?
                        </Typography>
                        <Switch />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" gutterBottom>
                            Can you speak in Chinese?
                        </Typography>
                        <Switch />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth label="Enter your title" variant="outlined" />
                    </Grid>
                </Grid>

                <Grid container spacing={3} style={{ marginTop: '5px' }}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" gutterBottom>
                            Can you speak in German?
                        </Typography>
                        <Switch />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" gutterBottom>
                            Can you speak in Portuguese?
                        </Typography>
                        <Switch />
                    </Grid>
                </Grid>

                <Grid container spacing={3} style={{ marginTop: '5px' }}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" gutterBottom>
                            Can you speak in Spanish?
                        </Typography>
                        <Switch />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" gutterBottom>
                            Can you speak in French?
                        </Typography>
                        <Switch />
                    </Grid>
                </Grid>

                <Grid container spacing={3} style={{ marginTop: '5px' }}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" gutterBottom>
                            Can you speak in Russian?
                        </Typography>
                        <Switch />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" gutterBottom>
                            Can you speak in Italian?
                        </Typography>
                        <Switch />
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
