import React, { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtons({ stepperData, handleStepperData }) {
    const [alignment, setAlignment] = useState('no');

    // Update local state when stepperData changes
    useEffect(() => {
        if (stepperData?.kbaRequired) {
            setAlignment(stepperData?.kbaRequired);
        }
    }, [stepperData?.kbaRequired]);

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
            handleStepperData({
                target: { name: 'kbaRequired', value: newAlignment } // Pass updated value to handleStepperData
            });
        }
    };

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            name='kbaRequired'
            onChange={handleAlignment}
            aria-label="yes or no"
        >
            <ToggleButton value="yes" aria-label="yes">
                Yes
            </ToggleButton>
            <ToggleButton value="no" aria-label="no">
                No
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
