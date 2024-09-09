import React from 'react'
import { Divider, Grid, Typography } from '@mui/material'
import DatePickerComp from '../../../../components/DatePicker/DatePicker'
import JobTime from '../../../../components/JobTime/JobTime'
import JobDocs from '../../../../components/JobDocs/JobDocs'

const ScheduleAndDoc = ({ stepperData, handleStepperData }) => {
    return (
        <div style={{ marginTop: '40px' }}>
            {/* Container for scheduling and documentation components */}
            <Grid item xs={12} sm={4}>
                <Typography variant="h6" gutterBottom>
                    Schedule
                </Typography>

                {/* Date picker component for selecting a date */}
                <DatePickerComp stepperData={stepperData} handleStepperData={handleStepperData} />

                {/* Job time component for setting job time */}
                <JobTime stepperData={stepperData} handleStepperData={handleStepperData} />

                <br />
                <br />
                <br />
                <br />

                {/* Job documents component for handling job-related documents */}
                <JobDocs stepperData={stepperData} handleStepperData={handleStepperData} />
            </Grid>
        </div>
    )
}

export default ScheduleAndDoc
