import React, { useState } from 'react'
import {
    Box,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Grid,
    TableContainer,
    Paper,
} from '@mui/material'
import { AddParticipant } from '../../components/DynamicButton/DynamicButton'
import NotaryInformation from './notaryInformation/notaryInformation'

const NotaryManagement = () => {
    const [showTable, setShowTable] = useState(true)

    const [notaryData, setNotaryData] = useState([
        {
            id: 'ANDPET01',
            fullName: 'Peta-Gaye Anderson',
            email: 'petagaye@pglservices.net',
            city: 'sunrise',
            certified: true,
            status: 'Enabled',
        },
        {
            id: 'ARNPAT08',
            fullName: 'Patricia Arnaiz Chipoco',
            email: 'patricia.arnaiz1@gmail.com',
            city: 'Palm Bay',
            certified: false,
            status: 'Disabled',
        },
        {
            id: 'FEADAL05',
            fullName: 'Dalarrion featherston',
            email: 'dalarrionf@gmail.com',
            city: 'hampton',
            certified: true,
            status: 'Enabled',
        },
        {
            id: 'KARSUS07',
            fullName: 'Susan Karen Oliveira',
            email: 'susan@oliveriamobilenotary.com',
            city: 'Palm Bay',
            certified: false,
            status: 'Disabled',
        },
        {
            id: 'LEHBRI10',
            fullName: 'Brian Lehman',
            email: 'brianlehman97@gmail.com',
            city: '..',
            certified: true,
            status: 'Enabled',
        },
        {
            id: 'MCCVAN04',
            fullName: 'Vanessa McCarsky',
            email: 'enotaryrva@gmail.com',
            city: 'Henrico',
            certified: true,
            status: 'Enabled',
        },
        {
            id: 'N-1-a5d25',
            fullName: 'Muhammad Umer',
            email: 'm.umer@softvira.com',
            city: 'Ashland',
            certified: false,
            status: 'Disabled',
        },
    ])

    const notaries = ['All Notaries', 'Enabled Notaries', 'Disabled Notaries', 'Pending Notaries']

    const handleRemove = (id) => {
        setNotaryData(notaryData.filter((notary) => notary.id !== id))
    }

    const actionButtons = [
        {
            label: 'Files',
            color: 'primary',
            onClick: (id) => alert(`Files clicked for ${id}`),
        },
        {
            label: 'Update',
            color: 'secondary',
            onClick: (id) => setShowTable(false),
        },
        {
            label: 'Delete',
            color: 'error',
            onClick: (id) => handleRemove(id),
        },
        {
            label: 'Disable',
            color: 'warning',
            onClick: (id) => alert(`Disable clicked for ${id}`),
        },
    ]

    return (
        <div>
            {showTable && (
                <Box
                    sx={{
                        padding: 5,
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        boxShadow: 2,
                        // maxWidth: 1100,
                        margin: 'auto',
                        marginTop: '20px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="h6" component="div">
                            All Notaries
                        </Typography>
                        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                            <InputLabel id="notary-select-label">Notaries</InputLabel>
                            <Select
                                labelId="notary-select-label"
                                id="notary-select"
                                label="Notaries"
                            >
                                {notaries.map((notary, index) => (
                                    <MenuItem key={index} value={notary}>
                                        {notary}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <div style={{ marginTop: '20px', marginBottom: '30px' }}>
                        <AddParticipant children={'Create'} onClick={() => setShowTable(false)} />
                    </div>
                    <Box sx={{ overflowX: 'auto', mt: 3 }}>
                        <TableContainer component={Paper} sx={{ mt: 2, width: '100%' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Full Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>City</TableCell>
                                        <TableCell>Certified Signing Agent</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {notaryData.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.fullName}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{row.city}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={
                                                        row.certified
                                                            ? 'Certified'
                                                            : 'Not Certified'
                                                    }
                                                    sx={{
                                                        backgroundColor: row.certified
                                                            ? '#E6FFFA'
                                                            : '#FA896B',
                                                        color: row.certified ? '#5DEAD0' : 'white',
                                                        fontWeight: 'bold',
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={row.status}
                                                    sx={{
                                                        backgroundColor:
                                                            row.status === 'Enabled'
                                                                ? '#13DEB9'
                                                                : '#FA896B',
                                                        color: 'white',
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    {actionButtons.map((action, btnIndex) => (
                                                        <Button
                                                            key={btnIndex}
                                                            variant="outlined"
                                                            color={action.color}
                                                            onClick={() => action.onClick(row.id)}
                                                        >
                                                            {action.label}
                                                        </Button>
                                                    ))}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            )}
            {!showTable && <NotaryInformation handleBack={() => setShowTable(true)} />}
        </div>
    )
}

export default NotaryManagement
