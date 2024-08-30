import React from 'react'
import BillingDetails from '../../../../components/BillingDetail/BillingDetail'
import { Box } from '@mui/system'
import { Grid, TextField, Typography } from '@mui/material'
import Heading from '../../../../components/Heading/heading'

const Billing = () => {
    const Billing1 = [
        { label: 'Single Document Signing', price: '1' },
        { label: 'Number of Signers', price: '1' },
        { label: 'Number of Witnesses', price: '1' },
        { label: 'Number of Documents', price: '1' },
    ]

    const Billing2 = [
        { label: 'Single Document Signing', price: '25' },
        { label: 'Signer Pricing', price: '0' },
        { label: 'Witness Pricing', price: '0' },
        { label: 'Document Pricing', price: '0' },
    ]
    const total = Billing2.reduce((sum, item) => sum + parseFloat(item.price), 0)

    return (
        <div style={{ marginTop: '40px' }}>
            <BillingDetails heading={'Billing Details'} items={Billing1} />
            <BillingDetails
                heading={'Billing Summary'}
                items={Billing2}
                isTotal={true}
                totalPrice={total}
            />
            <Box
                sx={{ 
                    padding: 5,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    boxShadow: 2,
                    maxWidth: 900,
                    margin: 'auto',
                    marginBottom: '20px',
                }}
            >
                <Heading heading={'Payment'} />

                <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            id="cardHolder-name"
                            label="Enter Card Holder Name"
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            fullWidth
                            id="card-number"
                            label="Enter Card Number"
                            variant="outlined"
                            required
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Billing
