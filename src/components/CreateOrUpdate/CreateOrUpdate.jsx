import React from 'react'
import {
    Box,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    MenuItem,
    Button,
    Typography,
    Divider,
} from '@mui/material'
import { BackButton } from '../DynamicButton/DynamicButton'

const CreateOrUpdate = ({
    formData,
    handleChange,
    handleSave,
    handleCancel,
    isEditMode,
    isDate,
    fields,
    isPrice,
    submenu,
    note,
    close
}) => {
    return (
        <Box
            sx={{
                borderRadius: 2,
                maxWidth: 1100,
                marginTop: '20px',
                ...(isPrice && {
                    padding: 5,
                    border: '1px solid #e0e0e0',
                    boxShadow: 2,
                    margin: 'auto',
                }),
            }}
        >
                                    <div style={{marginBottom: "10px"}}><BackButton handleBack={close} /></div>

            {submenu || note ? (
                <div
                    style={{
                        backgroundColor: '#FFEFD2',
                        padding: '15px',
                        borderRadius: '10px',
                        color: '#A66813',
                        marginBottom: '20px',
                    }}
                >
                    <Typography variant="h6" component="div">
                        Developer note:
                    </Typography>
                    <p style={{ fontSize: '14px' }}>
                        When you create a submenu it must already exist in your system's file
                        manager or you have to add the file. File path is based on the entered
                        {submenu && "Sub"} Menu URL.
                        {
                            submenu && (
                       <>
                        <Divider style={{ marginBottom: '10px', marginTop: '10px' }} />
                        <span>
                            Creating sub menu will update the selected Menu URL into blank.
                        </span>
                       </>
                        )
                    }
                    </p>
                </div>
            ):null}
            <Grid container spacing={2}>
                {fields.map((field, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <TextField
                            fullWidth
                            label={field.label}
                            variant="outlined"
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            required={field.required || false}
                            type={field.type || 'text'}
                            select={field.select || false}
                        >
                            {field.select &&
                                field.options.map((option, optionIndex) => (
                                    <MenuItem key={optionIndex} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                ))}
                {isDate && (
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Date Created"
                            variant="outlined"
                            name="dateCreated"
                            value={formData.dateCreated || ''}
                            onChange={handleChange}
                            disabled
                        />
                    </Grid>
                )}
                {isPrice && (
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="price-input">Price</InputLabel>
                            <Input
                                id="price-input"
                                name="price"
                                type="number"
                                value={formData.price || ''}
                                onChange={handleChange}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Price"
                            />
                        </FormControl>
                    </Grid>
                )}
            </Grid>
            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    {isEditMode ? 'Update' : 'Create'}
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ ml: 2 }}>
                    Cancel
                </Button>
            </Box>
        </Box>
    )
}

export default CreateOrUpdate
