import React, { useState } from 'react';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

const QuantityInput = () => {
    const [value, setValue] = useState(1);

    const handleIncrement = () => {
        setValue((prev) => Math.min(prev + 1, 99));
    };

    const handleDecrement = () => {
        setValue((prev) => Math.max(prev - 1, 1));
    };

    return (
        <Container>
            <StyledIconButton onClick={handleDecrement} aria-label="decrement">
                <RemoveIcon />
            </StyledIconButton>
            <TextField
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                type="number"
                inputProps={{ min: 1, max: 99 }}
                aria-label="quantity input"
                style={{ width: '4rem', textAlign: 'center', marginLeft: "10px", marginRight: "10px" }}
            />
            <StyledIconButton onClick={handleIncrement} aria-label="increment">
                <AddIcon />
            </StyledIconButton>
        </Container>
    );
};

const Container = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledIconButton = styled(IconButton)`
    padding: 8px;
    border-radius: 50px;
    border: 1px solid #dcdcdc;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    &:hover {
        background-color: #e0e0e0;
    }
    &:active {
        background-color: #d0d0d0;
    }
`;

export default QuantityInput;
