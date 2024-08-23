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

export default DynamicButton;
