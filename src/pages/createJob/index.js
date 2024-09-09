import React, { useState } from 'react'
import Steppers from '../../components/Stepper/Stepper'
import { Typography } from '@mui/material'
import useStore from '../../stores/useStore'
import ClientInfo from '../../components/ClientInformation/ClientInfo'
import SignerInfo from './CreateJobComp/SignerInformation/SignerInfo'
import Schedule from './CreateJobComp/Schedule/Schedule'
import JobDocs from '../../components/JobDocs/JobDocs'
import axios from 'axios'

const createJob = () => {
    const price = useStore((state) => state.price)
    const user = JSON.parse(localStorage.getItem('user'))
    const [JobStatus, setJobStatus] = useState("Pending")
    const steps = [
        'Client Information',
        'Signer Information',
        'Schedule Date/Time',
        'Job Documents',
    ]

    const [stepperData, setStepperData] = useState({
        titleCompany: '',
        closingType: '',
        internalReference: '',
        kbaRequired: '',
        propertyAddressOne: '',
        propertyAddressTwo: '',
        propertyCity: '',
        propertyState: '',
        propertyZipCode: '',

        //signer data
        signers: [],

        //user
        userId:user._id,

        //status
        JobStatus:JobStatus,

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

    const handleSubmit = async () => {
        const formData = new FormData()

        // Append other fields
        Object.entries(stepperData).forEach(([key, value]) => {
            if (key === 'signers') {
                formData.append(key, JSON.stringify(value)) // Convert array to JSON string
            } else if (key === 'uploadedFile' && value instanceof File) {
                formData.append('uploadedFile', value)
            } else {
                formData.append(key, value)
            }
        })

        // Logging the formData contents (for debugging purposes)
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value)
        // }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/jobs/createjob`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } },
                
            )
            console.log('job respsonse', response)
            alert(response.data.message)
        } catch (error) {
            console.log('job respsonse!!!!!!!!!!!!!', error)
            alert(error.response.data.message)
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Typography variant="h5" gutterBottom>
                    Total Price: <span style={{ fontWeight: 'bold' }}>{`$ ${price}.00`}</span>
                </Typography>
            </div>
            <div style={{ boxShadow: '3px 3px 20px #E6EFFF', padding: '60px' }}>
                <Steppers
                    handleSubmit={handleSubmit}
                    steps={steps}
                    Step1={
                        <ClientInfo
                            isClientInfo={true}
                            isSwitch={true}
                            stepperData={stepperData}
                            handleStepperData={handleStepperData}
                        />
                    }
                    Step2={
                        <SignerInfo
                            setStepperData={setStepperData}
                            stepperData={stepperData}
                            handleStepperData={handleStepperData}
                        />
                    }
                    Step3={
                        <Schedule stepperData={stepperData} handleStepperData={handleStepperData} />
                    }
                    Step4={
                        <JobDocs stepperData={stepperData} handleStepperData={handleStepperData} />
                    }
                />
            </div>
        </div>
    )
}

export default createJob
