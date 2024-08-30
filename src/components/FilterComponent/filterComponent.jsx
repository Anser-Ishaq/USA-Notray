import React from 'react'
import { Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material'

const FilterComponent = ({ selectedFilter, handleFilterChange, roleFilters, icons }) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="flex-end">
            <FormControl variant="outlined" size="small" sx={{ width: '200px' }}>
                <InputLabel id="role-filter-label"></InputLabel>
                <Select
                    value={selectedFilter}
                    onChange={handleFilterChange}
                    style={{ backgroundColor: '#6393e6', color: 'white' }}
                >
                    {roleFilters.map((filter) => (
                        <MenuItem key={filter} value={filter}>
                            {icons[filter]} {filter}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default FilterComponent
