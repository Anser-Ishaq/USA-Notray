import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';

const StyledButton = styled(Button)(({ theme }) => ({
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: "10px"
}));

const DynamicButton = ({ selected, onClick, icon: Icon, children }) => {
    return (
        <StyledButton 
            variant={selected ? "contained" : "outlined"} 
            onClick={onClick}
            startIcon={Icon && <Icon />}
        >
            {children}
        </StyledButton>
    );
};

const StyledAddParticipant = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    backgroundColor: '#E6F0FF',
    color: '#49beff',
    borderRadius: '10px',
    height: '25px',
    width: 'auto',
    minWidth: "80px",
    padding: '0 10px',
    fontSize: '14px',
    border: 'none',
    '&:hover': {
        backgroundColor: 'white',
        color: '#49beff',
    },
}));

export const AddParticipant = ({ icon: Icon, onClick, children }) => {
    return (
        <StyledAddParticipant 
            variant="contained" 
            onClick={onClick}
            startIcon={Icon && <Icon />}
        >
            {children}
        </StyledAddParticipant>
    );
};

export const BackButton = ({ handleBack }) => {
    return (
        <Chip
        onClick={handleBack}
        label="Back"
        sx={{
            backgroundColor: '#5D87FF',
            color: 'white',
            marginRight: '20px',
            cursor: 'pointer',
        }}
    />
    );
};

export default DynamicButton;
