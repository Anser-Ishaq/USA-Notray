import { Typography } from '@mui/material'
import React from 'react'

const NotaryDetails = ({notaryName}) => {
    return (
        <div>
                <Typography variant="h6" gutterBottom>
                    Notary Details
                </Typography>
                <Typography variant="body1">Name:{notaryName} </Typography>
                <Typography variant="body1">Email: </Typography>
        </div>
    )
}

export default NotaryDetails
