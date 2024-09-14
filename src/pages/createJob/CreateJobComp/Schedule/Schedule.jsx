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

const Schedule = ({ stepperData, handleStepperData,errors }) => {
    const [notaryOption, setNotaryOption] = useState(stepperData.notaryOption || 'preferred')
    const [selectedNotary, setSelectedNotary] = useState(stepperData.selectedNotary || '')
    const [notaryName, setNotaryName] = useState('')

    const handleNotaryOptionChange = (event) => {
        const newValue = event.target.value
        setNotaryOption(newValue)

        if (newValue === 'preferred') {
            const preferredNotary = specificNotary.find((n) => n.id === 1)
            console.log('predefined niotea', preferredNotary)
            if (preferredNotary) {
                setSelectedNotary(preferredNotary.value);
                handleStepperData({ target: { name: 'selectedNotary', value: preferredNotary.value } });
            }
        } else if (newValue === 'random') {
            const randomNotary = specificNotary[Math.floor(Math.random() * specificNotary.length)]
            console.log('randomNotary', randomNotary)
            setSelectedNotary(randomNotary.value)
            handleStepperData({ target: { name: 'selectedNotary', value: randomNotary.value } })
        } else {
            setSelectedNotary('') // Clear selection for 'specific' option
        }

        handleStepperData(event) // Handle notaryOption change
    }

    const handleNotaryChange = (event) => {
        const newValue = event.target.value
        setSelectedNotary(newValue)
        handleStepperData(event)
    }

    // Update state when stepperData changes
    // Update selectedNotary and notaryName based on stepperData
    useEffect(() => {
        setNotaryOption(stepperData.notaryOption || 'preferred');
        if (stepperData.notaryOption === 'preferred') {
            const preferredNotary = specificNotary.find((n) => n.id === 1);
            if (preferredNotary) {
                setSelectedNotary(preferredNotary.value);
            }
        } else {
            setSelectedNotary(stepperData.selectedNotary || '');
        }
    }, [stepperData, specificNotary]);

    // Update notaryName when selectedNotary changes
    useEffect(() => {
        const notary = specificNotary.find((n) => n.value === selectedNotary);
        console.log("Notary found:", notary);
        setNotaryName(notary ? notary.label : '');
    }, [selectedNotary, specificNotary]);

    return (
        <div style={{ padding: 16, marginTop: '40px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Typography 
                     sx={{
                        color: errors.selectedDate ? 'red' : 'inherit', // 'inherit' keeps the default color
                      }}
                    variant="h6" gutterBottom>
                        Schedule
                    </Typography>
                    <DatePickerComp
                        stepperData={stepperData}
                        handleStepperData={handleStepperData}
                        errors={errors}
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
                    <Typography variant="body1">Name:  {notaryName || 'Not Available'} </Typography>
                    <Typography variant="body1">Email: </Typography>
                </Grid>
                <JobTime
                    stepperData={stepperData}
                    handleStepperData={handleStepperData}
                    errors={errors}
                />
            </Grid>
        </div>
    )
}

export default Schedule
