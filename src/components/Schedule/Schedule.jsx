import * as React from 'react'
import {
    Grid,
    Typography,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { specificNotary } from '../../Data/OptionValues'
import { timeSlots } from '../../Data/OptionValues'

const Schedule = () => {
    const [selectedDate, setSelectedDate] = React.useState(null)
    const [notaryOption, setNotaryOption] = React.useState('preferred')
    const [selectedNotary, setSelectedNotary] = React.useState() 
    const [selectedTime, setSelectedTime] = React.useState('')
    const [dateError, setDateError] = React.useState('')

    const handleDateChange = (newValue) => {
        if (newValue) {
            setSelectedDate(newValue)
            setDateError('')
        } else {
            setDateError('Please select a date')
        }
    }

    const handleNotaryOptionChange = (event) => {
        setNotaryOption(event.target.value)
    }

    const handleNotaryChange = (event) => {
        setSelectedNotary(event.target.value)
    }

    const handleTimeChange = (value) => {
        setSelectedTime(value)
    }

    return (
        <div style={{ padding: 16, marginTop: "40px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                        Job Date
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Select Job Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    helperText={dateError}
                                    error={!!dateError}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl component="fieldset">
                        <Typography variant="h6" gutterBottom>
                            Notary Assigning Option
                        </Typography>
                        <RadioGroup value={notaryOption} onChange={handleNotaryOptionChange}>
                            <FormControlLabel
                                value="preferred"
                                control={<Radio />}
                                label="Preferred Notary"
                            />
                            <FormControlLabel
                                value="random"
                                control={<Radio />}
                                label="Random Notary"
                            />
                            <FormControlLabel
                                value="specific"
                                control={<Radio />}
                                label="Specific Notary"
                            />
                        </RadioGroup>
                    </FormControl>
                    {notaryOption === 'specific' && (
                        <Grid item xs={12}> 
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="specific-notary-label">Specific Notary</InputLabel>
                                <Select
                                    labelId="specific-notary-label"
                                    id="specific-notary"
                                    label="Specific Notary"
                                    value={selectedNotary}
                                    onChange={handleNotaryChange} 
                                >
                                    {specificNotary.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                            disabled={option.disabled}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )}
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                        Notary Details
                    </Typography>
                    <Typography variant="body1">Name: </Typography>
                    <Typography variant="body1">Email: </Typography>
                </Grid>

                {selectedDate && (
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Job Time
                        </Typography>
                        <Grid container spacing={2}>
                            {Object.keys(timeSlots).map((period) => (
                                <Grid item xs={12} sm={4} key={period}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {period.charAt(0).toUpperCase() + period.slice(1)}
                                    </Typography>
                                    {timeSlots[period].map((slot) => (
                                        <Button
                                            key={slot.value}
                                            fullWidth
                                            variant={selectedTime === slot.value ? 'contained' : 'outlined'}
                                            onClick={() => handleTimeChange(slot.value)}
                                            style={{marginBottom: "10px"}}
                                        >
                                            {slot.label}
                                        </Button>
                                    ))}
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default Schedule
