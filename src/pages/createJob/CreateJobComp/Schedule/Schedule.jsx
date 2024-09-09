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
import { useEffect, useState } from 'react'

const Schedule = ({ stepperData, handleStepperData }) => {
    const [notaryOption, setNotaryOption] = useState(stepperData.notaryOption || 'preferred');
    const [selectedNotary, setSelectedNotary] = useState(stepperData.selectedNotary || '');

    // Update state when stepperData changes
    useEffect(() => {
        setNotaryOption(stepperData.notaryOption || 'preferred');
        setSelectedNotary(stepperData.selectedNotary || '');
    }, [stepperData]);

    const handleNotaryOptionChange = (event) => {
        const newValue = event.target.value;
        setNotaryOption(newValue);
        handleStepperData(event); // Update the parent state
    };

    const handleNotaryChange = (event) => {
        const newValue = event.target.value;
        setSelectedNotary(newValue);
        handleStepperData(event); // Update the parent state
    };

    return (
        <div style={{ padding: 16, marginTop: '40px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                        Schedule
                    </Typography>
                    <DatePickerComp
                        stepperData={stepperData}
                        handleStepperData={handleStepperData}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl component="fieldset">
                        <Typography variant="h6" gutterBottom>
                            Notary Assigning Option
                        </Typography>
                        <RadioGroup
                            name="notaryOption"
                            value={notaryOption} // Use local state
                            onChange={handleNotaryOptionChange}
                        >
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
                                    name="selectedNotary"
                                    value={selectedNotary} // Use local state
                                    onChange={handleNotaryChange} // Use local handler
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
                <JobTime stepperData={stepperData} handleStepperData={handleStepperData} />
            </Grid>
        </div>
    )
}

export default Schedule
