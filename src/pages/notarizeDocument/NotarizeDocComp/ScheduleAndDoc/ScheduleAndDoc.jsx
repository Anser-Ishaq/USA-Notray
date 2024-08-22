import { Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import DatePickerComp from '../../../../components/DatePicker/DatePicker'
import JobTime from '../../../../components/JobTime/JobTime'
import JobDocs from '../../../../components/JobDocs/JobDocs'

const ScheduleAndDoc = () => {
    return (
        <div>
            <Grid item xs={12} sm={4}>
                <Typography variant="h6" gutterBottom>
                    Schedule
                </Typography>
                <DatePickerComp />
                <JobTime />
                <br />
                <br />
                <Divider />
                <br />
                <br />
                <JobDocs />
            </Grid>
        </div>
    )
}

export default ScheduleAndDoc
