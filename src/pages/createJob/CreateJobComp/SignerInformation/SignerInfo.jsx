import React, { useState ,useEffect} from 'react'
import { Box, Typography, Button, Grid } from '@mui/material'
import AddSignerModal from '../SignerInformation/singerModal/singerModalForm'
import DynamicTable from '../../../../components/dynamicTable/dynamicTable'

const SignerInfo = ({stepperData,setStepperData,handleStepperData,errors}) => {
    const [open, setOpen] = useState(false)
    const [signers, setSigners] = useState([])

    const columns = [
        { id: 'signerName', label: 'Name' },
        { id: 'signerEmail', label: 'Email' },
        { id: 'signerPhoneNumber', label: 'Phone' },
        { id: 'signerRole', label: 'Role' },
        { id: 'actions', label: 'Action' },
    ]

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleAddSigner = (signerData) => {
        console.log('Adding Signer:', signerData);
        
        setStepperData((prevData) => {
            const updatedSigners = [...prevData.signers, signerData];
            console.log('Updated Signers:', updatedSigners);
    
            // Ensure the local state is updated as well
            setSigners(updatedSigners);
    
            return {
                ...prevData,
                signers: updatedSigners,
            };
        });
    };
    

    const handleRemove = (index) => {
        // Remove the signer from the local signers state
        const updatedSigners = signers.filter((_, i) => i !== index);
        setSigners(updatedSigners);
    
        // Also update the signers in stepperData
        setStepperData((prevData) => ({
            ...prevData,
            signers: updatedSigners
        }));
    
        console.log('Remove row at index:', index);
    }

    const renderActionButton = (row, index) => (
        <Button variant="outlined" color="secondary" onClick={() => handleRemove(index)}>
            Remove
        </Button>
    )

    useEffect(() => {
        setSigners(stepperData.signers);
    }, [stepperData.signers]);

    return (
        <Grid container justifyContent="center" style={{ marginTop: '40px' }}>
            <Grid item xs={12}>
                <Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        bgcolor="#00b0ff"
                        p={3}
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        borderRadius="4px"
                    >
                        <Typography variant="h6" color="white" mb={{ xs: 1, sm: 0 }}>
                            Participant's Information

                            <Typography   color="red" mb={{ xs: 1, sm: 0 }}>
                            {errors.signers ? "Add Atleast One Signer" : ""}
                        </Typography>
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ height: '25px', borderRadius: '5px', color: '#49beff' }}
                            startIcon={<span>+</span>}
                            onClick={handleOpen}
                            sx={{
                                textTransform: 'none',
                                bgcolor: 'white',
                                color:  errors.signers ? 'red' : '#49beff',
                                width: { xs: '100%', sm: 'auto' },
                                '&:hover': {
                                    bgcolor: 'white',
                                    color: '#49beff',
                                },
                            }}
                        >
                            Add Participant
                        </Button>
                    </Box>

                    <AddSignerModal
                    stepperData={stepperData}
                    handleStepperData={handleStepperData}
                        open={open}
                        handleClose={handleClose}
                        onAddSigner={handleAddSigner}
                    />

                    <DynamicTable
                        actionButton={renderActionButton}
                        columns={columns}
                        data={signers}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default SignerInfo
