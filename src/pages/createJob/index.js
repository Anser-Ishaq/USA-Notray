import React from 'react'
import Steppers from '../../components/Stepper/Stepper'
import { Typography } from '@mui/material'
import useStore from '../../stores/useStore'
import ClientInfo from '../../components/ClientInformation/ClientInfo'
import SignerInfo from './CreateJobComp/SignerInformation/SignerInfo'
import Schedule from './CreateJobComp/Schedule/Schedule'
import JobDocs from '../../components/JobDocs/JobDocs'

const createJob = () => {
    const price = useStore((state) => state.price)
    const steps = [
        'Client Information',
        'Signer Information',
        'Schedule Date/Time',
        'Job Documents',
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
                    Step1={<ClientInfo isClientInfo={true} isSwitch={true}/>}
                    Step2={<SignerInfo />}
                    Step3={<Schedule />}
                    Step4={<JobDocs />}
                />
            </div>
        </div>
    )
}

export default createJob
