import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtons() {
  const [alignment, setAlignment] = useState('yes');

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
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
