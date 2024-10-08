import React, { useState } from 'react'
import Steppers from '../../components/Stepper/Stepper'
import { Typography } from '@mui/material'
import useStore from '../../stores/useStore'
import ClientInfo from '../../components/ClientInformation/ClientInfo'
import SignerInfo from './CreateJobComp/SignerInformation/SignerInfo'
import Schedule from './CreateJobComp/Schedule/Schedule'
import JobDocs from '../../components/JobDocs/JobDocs'
import axios from 'axios'
import Swal from 'sweetalert2'


const createJob = () => {
    const price = useStore((state) => state.price)
    const user = JSON.parse(localStorage.getItem('user'))
    const [JobStatus, setJobStatus] = useState('Pending')
    const [loading, setLoading] = useState(false)
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
        userId: user._id,

        //status
        JobStatus: JobStatus,

        //scheduler data
        notaryOption: '',
        selectedNotary: '',
        selectedDate: '',
        selectedTime: '',

        //job docs
        uploadedFile: '',
    })
    const [errors, setErrors] = useState({
        titleCompany: false,
        closingType: false,
        internalReference: false,
        signers: false,
        selectedNotary: false,
        selectedDate: false,
        selectedTime: false,
        uploadedFile: false,
    })
    const steps = [
        'Client Information',
        'Signer Information',
        'Schedule Date/Time',
        'Job Documents',
    ]

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
        Object.entries(stepperData).forEach(([key, value]) => {
            if (key === 'signers') {
                formData.append(key, JSON.stringify(value)) // Convert array to JSON string
            } else if (key === 'uploadedFile' && value instanceof File) {
                formData.append('uploadedFile', value)
            } else {
                formData.append(key, value)
            }
        })
        setLoading(true)
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/jobs/createjob`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } },
            )
            console.log('job respsonse', response)
            // alert(response.data.message)
            Swal.fire({
                title: `${response?.data?.message}`,
                icon: 'success',
            })
        } catch (error) {
            console.error("error",error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.response.data}`,
            })
        } finally {
            setLoading(false) // Hide the loader
        }
    }

    const validateStep = (step) => {
        let newErrors = { ...errors }
        let isValid = true

        switch (step) {
            case 0:
                newErrors.titleCompany = !stepperData.titleCompany
                newErrors.closingType = !stepperData.closingType
                newErrors.internalReference = !stepperData.internalReference
                break
            case 1:
                newErrors.signers = stepperData.signers.length === 0
                break
            case 2:
                newErrors.selectedDate = !stepperData.selectedDate
                newErrors.selectedTime = !stepperData.selectedTime
                break
            case 3:
                newErrors.uploadedFile = !stepperData.uploadedFile
                break
            default:
                break
        }
        isValid = !Object.values(newErrors).includes(true)
        setErrors(newErrors) // Update errors state

        return isValid
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
                    loading={loading}
                    handleSubmit={handleSubmit}
                    validateStep={validateStep}
                    steps={steps}
                    Step1={
                        <ClientInfo
                            isClientInfo={true}
                            isSwitch={true}
                            stepperData={stepperData}
                            handleStepperData={handleStepperData}
                            errors={errors}
                        />
                    }
                    Step2={
                        <SignerInfo
                            setStepperData={setStepperData}
                            stepperData={stepperData}
                            handleStepperData={handleStepperData}
                            errors={errors}
                        />
                    }
                    Step3={
                        <Schedule
                            stepperData={stepperData}
                            handleStepperData={handleStepperData}
                            errors={errors}
                        />
                    }
                    Step4={
                        <JobDocs stepperData={stepperData} handleStepperData={handleStepperData}  errors={errors} />
                    }
                />
            </div>
        </div>
    )
}

export default createJob
