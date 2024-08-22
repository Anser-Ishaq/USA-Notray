import React from 'react'
import { Box, Typography, Grid } from '@mui/material'

const BillingDetails = ({ heading, items, isTotal, totalPrice }) => {
    return (
        <Box
            sx={{
                padding: 5,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                boxShadow: 2,
                maxWidth: 900,
                margin: 'auto',
                marginBottom: "20px"
            }}
        >
            <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                {heading}
            </Typography>
            <Grid container spacing={1}>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="textSecondary">
                                {item.label}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} container justifyContent="flex-end">
                            <Typography variant="body2" color="textPrimary">
                                {
                                    isTotal ? `$${item.price}.00` : item.price
                                }
                            </Typography>
                        </Grid>
                    </React.Fragment>
                ))}
                {isTotal && (
                    <>
                        <Grid item xs={6}>
                            <Typography
                                gutterBottom
                                fontWeight="bold"
                                variant="body1"
                                color="textSecondary"
                            >
                                Total
                            </Typography>
                        </Grid>
                        <Grid item xs={6} container justifyContent="flex-end">
                            <Typography variant="body1" fontWeight="bold" color="textPrimary">
                                ${totalPrice}.00
                            </Typography>
                        </Grid>
                    </>
                )}
            </Grid>
        </Box>
    )
}

export default BillingDetails
