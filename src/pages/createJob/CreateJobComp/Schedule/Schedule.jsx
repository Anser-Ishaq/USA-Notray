import * as React from 'react'
import {
    Grid,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material'
import { specificNotary } from '../../../../Data/OptionValues'
import DatePickerComp from '../../../../components/DatePicker/DatePicker'
import JobTime from '../../../../components/JobTime/JobTime'

const Schedule = () => {
    const [notaryOption, setNotaryOption] = React.useState('preferred')
    const [selectedNotary, setSelectedNotary] = React.useState() 

    const handleNotaryOptionChange = (event) => {
        setNotaryOption(event.target.value)
    }

    const handleNotaryChange = (event) => {
        setSelectedNotary(event.target.value)
    }

    return (
        <div style={{ padding: 16, marginTop: "40px" }}>
            <Grid container spacing={2}>
                <DatePickerComp />
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
                <JobTime />
            </Grid>
        </div>
    )
}

export default Schedule
