import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Heading = ({ heading }) => {
    return (
        <>
            <Box display="flex" flexDirection="column" alignItems="flex-start" mr={3}>
                <Typography variant="h5" component="div">
                    {heading}
                </Typography>
            </Box>
        </>
    )
}

export default Heading
