import React, { useState } from 'react'
import Steppers from '../../components/Stepper/Stepper'
import { Typography } from '@mui/material'
import useStore from '../../stores/useStore'
import ClientInfo from '../../components/ClientInformation/ClientInfo'
import ParticipantInfo from './NotarizeDocComp/ParticipantInfo/ParticipantInfo'
import ScheduleAndDoc from './NotarizeDocComp/ScheduleAndDoc/ScheduleAndDoc'
import Billing from './NotarizeDocComp/Billing/Billing'

const NotarizeDocument = () => {
    // Retrieve price from store or default to 25
    const user = JSON.parse(localStorage.getItem('user'))
    const price = 25 || useStore((state) => state.price)
    // Define steps for the stepper component
    const steps = [
        'Client Information',
        "Participant's Information",
        'Schedule and Documents',
        'Billing and Orders',
    ]

    const [stepperData, setStepperData] = useState({
        closingType: '',
        internalReference: '',
        propertyAddressOne: '',
        propertyAddressTwo: '',
        propertyCity: '',
        propertyState: '',
        propertyZipCode: '',

        //signer data
        signers: [],

        //user
        userId: user._id,

        // cards
        cardHolder: '',
        cardNumber: '',

        //scheduler data

        notaryOption: '',
        selectedNotary: '',
        selectedDate: '',
        selectedTime: '',

        //job docs
        uploadedFile: '',
    })

    const handleStepperData = (e) => {
        const { name, value } = e.target
        console.log('name, value', name, value)

        setStepperData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    return (
        <div>
            {/* Display total price */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Typography variant="h5" gutterBottom>
                    Total Price: <span style={{ fontWeight: 'bold' }}>{`$ ${price}.00`}</span>
                </Typography>
            </div>
            {/* Container for the stepper component */}
            <div style={{ boxShadow: '3px 3px 20px #E6EFFF', padding: '60px' }}>
                <Steppers
                    steps={steps}
                    Step1={
                        <ClientInfo
                            stepperData={stepperData}
                            handleStepperData={handleStepperData}
                        />
                    }
                    Step2={
                        <ParticipantInfo
                        setStepperData={setStepperData}
                            stepperData={stepperData}
                            handleStepperData={handleStepperData}
                        />
                    }
                    Step3={
                        <ScheduleAndDoc
                            stepperData={stepperData}
                            handleStepperData={handleStepperData}
                        />
                    }
                    Step4={
                        <Billing stepperData={stepperData} handleStepperData={handleStepperData} />
                    }
                />
            </div>
        </div>
    )
}

export default NotarizeDocument
