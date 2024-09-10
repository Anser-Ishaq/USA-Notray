import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'

const Steppers = ({ steps, Step1, Step2, Step3, Step4, handleSubmit, loading }) => {
    const [activeStep, setActiveStep] = React.useState(0)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return Step1
            case 1:
                return Step2
            case 2:
                return Step3
            case 3:
                return Step4
            //   default:
            //     return 'Unknown step';
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ mt: 2, mb: 1 }}>{getStepContent(activeStep)}</Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant="outlined"
                >
                    Previous
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button
                    onClick={() => {
                        if (activeStep === steps.length - 1) {
                            handleSubmit()
                        } else {
                            handleNext()
                        }
                    }}
                    variant="contained"
                >
                    {loading
                        ? 'Submitting...'  
                        : activeStep === steps.length - 1
                          ? 'Submit'
                          : 'Next'}
                </Button>
            </Box>
        </Box>
    )
}

export default Steppers
