import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

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
    borderRadius: '5px',
    height: '25px',
    width: 'auto',
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

export default DynamicButton;
