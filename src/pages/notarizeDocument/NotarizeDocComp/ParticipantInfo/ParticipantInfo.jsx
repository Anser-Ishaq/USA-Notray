import React from 'react'
import QuantityInput from '../../../../components/NumberInput/NumberInput'
import { Divider, Grid } from '@mui/material'
import Switch from '../../../../components/Switch/Switch'

const ParticipantInfo = () => {
    return (
        <div style={{ marginTop: '40px' }}>
            <Grid container spacing={1}>
                <Grid
                    item
                    xs={12}
                    sm={4}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                >
                    <span style={{ marginRight: '8px', fontSize: '1rem', marginBottom: '10px' }}>
                        1. How many signers are there?
                    </span>
                    <QuantityInput />
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={4}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                >
                    <span style={{ marginRight: '8px', fontSize: '1rem', marginBottom: '20px' }}>
                        2. Are signers in different locations?
                    </span>
                    <Switch />
                </Grid>

            </Grid>
                <br />
                <br />
                <Divider />
                <br />
                <br />
        </div>
    )
}

export default ParticipantInfo
