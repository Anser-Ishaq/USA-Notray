import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import ApartmentIcon from '@mui/icons-material/Apartment'
import PaymentsIcon from '@mui/icons-material/Payments'
import SelectableButton from '../../components/DynamicButton/DynamicButton'
import { Box } from '@mui/system'
import TitleCompanies from './TitleCompanies/TitleCompanies'
import DefaultPricing from './DefaultPricing/DefaultPricing'

const Services = () => {
    // State to track the currently selected button
    const [selectedButton, setSelectedButton] = useState('title')

    // Function to handle button clicks
    const handleButtonClick = (button) => {
        setSelectedButton(button)
    }

    // Array of button configurations
    const buttons = [
        { id: 'title', label: 'Title Companies', icon: ApartmentIcon },
        { id: 'pricing', label: 'Default Pricing', icon: PaymentsIcon },
    ]

    return (
        <Grid container spacing={2}>
            {/* Container for the buttons */}
            <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="flex-start">
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

            {/* Conditional rendering of content based on selected button */}
            <Grid item xs={12}>
                {selectedButton === 'title' && <TitleCompanies />}
                {selectedButton === 'pricing' && <DefaultPricing />}
            </Grid>
        </Grid>
    )
}

export default Services
