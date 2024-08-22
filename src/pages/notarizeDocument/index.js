import React from 'react'
import Steppers from '../../components/Stepper/Stepper'
import { Typography } from '@mui/material'
import useStore from '../../stores/useStore'
import ClientInfo from '../../components/ClientInformation/ClientInfo'
import ParticipantInfo from './NotarizeDocComp/ParticipantInfo/ParticipantInfo'
import ScheduleAndDoc from './NotarizeDocComp/ScheduleAndDoc/ScheduleAndDoc'
import Billing from './NotarizeDocComp/Billing/Billing'

const NotarizeDocument = () => {
    const price = 25 || useStore((state) => state.price);
    const steps = [
        'Client Information',
        "Participant's Information",
        'Schedule and Documents',
        'Billing and Orders',
    ]

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Typography variant="h5" gutterBottom>
                    Total Price: <span style={{ fontWeight: 'bold' }}>{`$ ${price}.00`}</span>
                </Typography>
            </div>
            <div style={{ boxShadow: '3px 3px 20px #E6EFFF', padding: '60px' }}>
                <Steppers
                    steps={steps}
                    Step1={<ClientInfo />}
                    Step2={<ParticipantInfo />}
                    Step3={<ScheduleAndDoc />}
                    Step4={<Billing />}
                />
            </div>
        </div>
    )
}

export default NotarizeDocument
