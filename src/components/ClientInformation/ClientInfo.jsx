import React, { useState, useEffect } from 'react'
import {
    Grid,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
    Box,
} from '@mui/material'
import { titleCompanyOptions, closingTypeOptions } from '../../Data/OptionValues'
import Switch from '../../components/Switch/Switch'
import useStore from '../../stores/useStore'
import axios from 'axios'

const ClientInfo = ({ isClientInfo, isSwitch, stepperData, handleStepperData }) => {
    const [titleComanyOption, setTitleCompanyOption] = useState([])
    const [zipCodeError, setZipCodeError] = useState('')

    const setPrice = useStore((state) => state.setPrice)

    const zipCodePattern = /^\d{5}(-\d{4})?$/

    const updatePrice = (closingType) => {
        const selectedOption = closingTypeOptions.find((option) => option.value === closingType)
        console.log(selectedOption)

        if (selectedOption) {
            setPrice(selectedOption.dataPrice)
        }
    }

    const closing = (value) => {
        setClosingType(value || '')
        updatePrice(value)
    }

    const handleChange = (event) => {
        const { id, value } = event.target
        switch (id) {
            case 'title-company':
                setTitleCompany(value)
                break
            case 'closing-type':
                closing()
                break
            case 'internal-reference':
                setInternalReference(value)
                break
            case 'property-address-one':
                setPropertyAddressOne(value)
                break
            case 'property-address-two':
                setPropertyAddressTwo(value)
                break
            case 'property-city':
                setPropertyCity(value)
                break
            case 'property-state':
                setPropertyState(value)
                break
            case 'property-zip-code':
                setPropertyZipCode(value)
                if (zipCodePattern.test(value) || value === '') {
                    setZipCodeError('')
                } else {
                    setZipCodeError('Invalid ZIP Code format. Use 12345 or 12345-6789.')
                }
                break
            default:
                break
        }
    }

    const transformCompanyData = (companies) => {
        return companies.map((company, index) => ({
            id: index, // or you can use a unique ID if available
            value: company.companyName, // or another property that represents the value
            label: company.companyName, // or another property that represents the label
        }));
    };

    const handleFetchCompanyData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/company/getCompany`,
            )
            console.log('Full response data:', response.data)

            if (response.data.companies) {
               const titleCompanies = transformCompanyData(response.data.companies)
                setTitleCompanyOption(titleCompanies)
            }else {
                console.error('Unexpected response structure:', response.data)
            }
        } catch (error) {
            console.error('Error fetching company data:', error)
        }
    }

    useEffect(() => {
        handleFetchCompanyData()
    }, [])
    return (
        <>
            <Grid container spacing={2} style={{ marginTop: '40px' }}>
                {isClientInfo && (
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="title-company-label">Title Company</InputLabel>
                            <Select
                                labelId="title-company-label"
                                id="title-company"
                                label="Title Company"
                                name="titleCompany"
                                value={stepperData.titleCompany}
                                onChange={handleStepperData}
                                required
                            >
                                {titleComanyOption.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                )}

                <Grid item xs={12} sm={isClientInfo && isSwitch ? 3 : 6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="closing-type-label">Closing Type</InputLabel>
                        <Select
                            labelId="closing-type-label"
                            id="closing-type"
                            label="Closing Type"
                            name="closingType"
                            value={stepperData?.closingType}
                            onChange={handleStepperData}
                            required
                        >
                            {closingTypeOptions.map((option) => (
                                <MenuItem
                                    key={option.id}
                                    value={option.value}
                                    data-price={option.dataPrice}
                                >
                                    {option.value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={isClientInfo && isSwitch ? 3 : 6}>
                    <TextField
                        fullWidth
                        id="internal-reference"
                        label="Internal Reference"
                        variant="outlined"
                        name="internalReference"
                        value={stepperData?.internalReference}
                        onChange={handleStepperData}
                        required
                    />
                </Grid>

                {isSwitch && (
                    <Grid item xs={12} sm={3}>
                        <Box display="flex" alignItems="center">
                            <span style={{ marginRight: '8px', fontSize: '1rem' }}>
                                is KBA Required?
                            </span>
                            <Switch
                                stepperData={stepperData}
                                handleStepperData={handleStepperData}
                            />
                        </Box>
                    </Grid>
                )}

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="property-address-one"
                        label="Property Address One"
                        variant="outlined"
                        name="propertyAddressOne"
                        value={stepperData?.propertyAddressOne}
                        onChange={handleStepperData}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="property-address-two"
                        label="Property Address Two"
                        variant="outlined"
                        name="propertyAddressTwo"
                        value={stepperData?.propertyAddressTwo}
                        onChange={handleStepperData}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        id="property-city"
                        label="Property City"
                        variant="outlined"
                        name="propertyCity"
                        value={stepperData?.propertyCity}
                        onChange={handleStepperData}
                         
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        id="property-state"
                        label="Property State"
                        variant="outlined"
                        name="propertyState"
                        value={stepperData?.propertyState}
                        onChange={handleStepperData}
                         
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        id="property-zip-code"
                        label="Property Zip Code"
                        variant="outlined"
                        name="propertyZipCode"
                        value={stepperData?.propertyZipCode}
                        onChange={handleStepperData}
                        error={!!zipCodeError}
                        helperText={zipCodeError}
                        required
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default ClientInfo
