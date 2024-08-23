import React from 'react';
import { Box, Grid, TextField, FormControl, InputLabel, Input, InputAdornment, MenuItem, Button } from '@mui/material';

const CreateOrUpdate = ({ 
    formData, 
    handleChange, 
    handleSave, 
    handleCancel, 
    isEditMode 
}) => {
    return (
        <Box
            sx={{
                padding: 5,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                boxShadow: 2,
                maxWidth: 1100,
                margin: 'auto',
                marginTop: '20px',
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Service Name"
                        variant="outlined"
                        name="serviceName"
                        value={formData.serviceName}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="price-input">Price</InputLabel>
                        <Input
                            id="price-input"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Price"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        select
                        label="Status"
                        variant="outlined"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </TextField>
                </Grid>
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
            </Grid>
            <Box mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                >
                    {isEditMode ? 'Update' : 'Create'}
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                    sx={{ ml: 2 }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default CreateOrUpdate;
