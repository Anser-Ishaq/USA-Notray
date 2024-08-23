import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PaymentsIcon from '@mui/icons-material/Payments';
import SelectableButton from '../../components/DynamicButton/DynamicButton'; 
import { Box } from '@mui/system';
import TitleCompanies from './TitleCompanies/TitleCompanies';
import DefaultPricing from './DefaultPricing/DefaultPricing';

const Services = () => {
    const [selectedButton, setSelectedButton] = useState('title');

    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    const buttons = [
        { id: 'title', label: 'Title Companies', icon: ApartmentIcon, selectedButton},
        { id: 'pricing', label: 'Default Pricing', icon: PaymentsIcon },
    ];

    return (
      <Grid container spacing={2}>

        <Grid item xs={12}>
            <Box alignItems="center" justifyContent="center" >
                {buttons.map((button) => (
                    <SelectableButton 
                        key={button.id} 
                        selected={selectedButton === button.id} 
                        onClick={() => handleButtonClick(button.id)} 
                        icon={button.icon}
                    >
                        {button.label}
                    </SelectableButton>
                ))}
            </Box>
        </Grid>
         <Grid item xs={12}>
         {selectedButton === 'title' && <TitleCompanies />}
         {selectedButton === 'pricing' && <DefaultPricing />}
     </Grid>
     </Grid>

    );
};

export default Services;
