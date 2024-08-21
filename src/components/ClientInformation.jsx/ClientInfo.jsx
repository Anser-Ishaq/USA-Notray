import React, { useState } from 'react'
import { Grid, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import { titleCompanyOptions, closingTypeOptions } from '../../Data/OptionValues'
import Switch from '../Switch/Switch'

const ClientInfo = () => {
    const [titleCompany, setTitleCompany] = useState()
    const [closingType, setClosingType] = useState()
    const [internalReference, setInternalReference] = useState('')
    const [propertyAddressOne, setPropertyAddressOne] = useState('')
    const [propertyAddressTwo, setPropertyAddressTwo] = useState('')
    const [propertyCity, setPropertyCity] = useState('')
    const [propertyState, setPropertyState] = useState('')
    const [propertyZipCode, setPropertyZipCode] = useState('')
    const [zipCodeError, setZipCodeError] = useState('')

    const zipCodePattern = /^\d{5}(-\d{4})?$/

    const handleChange = (event) => {
        const { id, value } = event.target
        switch (id) {
            case 'title-company':
                setTitleCompany(value)
                break
            case 'closing-type':
                setClosingType(value)
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

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="title-company-label">Title Company</InputLabel>
                        <Select
                            labelId="title-company-label"
                            id="title-company"
                            label="Title Company"
                            value={titleCompany}
                            onChange={handleChange}
                            required
                        >
                            {titleCompanyOptions.map((option) => (
                                <MenuItem key={option.id} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="closing-type-label">Closing Type</InputLabel>
                        <Select
                            labelId="closing-type-label"
                            id="closing-type"
                            label="Closing Type"
                            value={closingType}
                            onChange={handleChange}
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

                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        id="internal-reference"
                        label="Internal Reference"
                        variant="outlined"
                        value={internalReference}
                        onChange={handleChange}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Switch />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="property-address-one"
                        label="Property Address One"
                        variant="outlined"
                        value={propertyAddressOne}
                        onChange={handleChange}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="property-address-two"
                        label="Property Address Two"
                        variant="outlined"
                        value={propertyAddressTwo}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        id="property-city"
                        label="Property City"
                        variant="outlined"
                        value={propertyCity}
                        onChange={handleChange}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        id="property-state"
                        label="Property State"
                        variant="outlined"
                        value={propertyState}
                        onChange={handleChange}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        id="property-zip-code"
                        label="Property Zip Code"
                        variant="outlined"
                        value={propertyZipCode}
                        onChange={handleChange}
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
