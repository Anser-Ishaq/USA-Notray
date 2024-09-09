import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'

const Upload = ({ label, stepperData, handleStepperData }) => {
    const [fileName, setFileName] = useState('')

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setFileName(file.name)
            handleStepperData({
                target: { name: 'uploadedFile', value: file }, // Simulate an event-like object with the file
            })
        } else {
            setFileName('')
        }
    }
    return (
        <div>
            <Typography variant="body1" gutterBottom>
                {label}
            </Typography>
            <Button
                variant="outlined"
                component="label"
                sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    borderColor: 'lightgrey',
                    padding: '10px 20px',
                    fontSize: { xs: '14px', sm: '16px' },
                    textTransform: 'none',
                    width: '100%',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: { xs: 1, sm: 2 },
                }}
            >
                Choose Files
                <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {fileName && (
                <Typography variant="body2" mt={2} sx={{ wordWrap: 'break-word' }}>
                    Selected file: {fileName}
                </Typography>
            )}
        </div>
    )
}

export default Upload
