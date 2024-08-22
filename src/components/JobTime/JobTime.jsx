import React, { useState } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { timeSlots } from '../../Data/OptionValues'
import useStore from '../../stores/useStore'

const JobTime = () => {
    const [selectedTime, setSelectedTime] = useState('')

    const isDate = useStore((state) => state.selectedDate)

    const handleTimeChange = (value) => {
        setSelectedTime(value)
    }
    return (
        <div>
            {isDate && (
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
                                        variant={
                                            selectedTime === slot.value ? 'contained' : 'outlined'
                                        }
                                        onClick={() => handleTimeChange(slot.value)}
                                        style={{ marginBottom: '10px' }}
                                    >
                                        {slot.label}
                                    </Button>
                                ))}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            )}
        </div>
    )
}

export default JobTime
