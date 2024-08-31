import React, { useState } from 'react'
import { Box, Typography, Select, MenuItem, FormControl, Chip, InputLabel } from '@mui/material'
import AddParticipant from '../../components/DynamicButton/DynamicButton'
import NotaryInformation from './notaryInformation/notaryInformation'
import FileModal from './fileModal/fileModal'
import DynamicTable from '../../components/dynamicTable/dynamicTable2'
import notaryInfo from './data'
import Search from '../../components/Search/search'
import Heading from '../../components/Heading/heading'

const NotaryManagement = () => {
    // State management
    const [showTable, setShowTable] = useState(true)
    const [openFileModal, setOpenFileModal] = useState(false)
    const [selectedNotaryId, setSelectedNotaryId] = useState(null)
    const [selectedFilter, setSelectedFilter] = useState('All Notaries')
    const [searchQuery, setSearchQuery] = useState('')
    const [notaryData, setNotaryData] = useState(notaryInfo)

    // Filter options
    const notaryFilterOptions = [
        'All Notaries',
        'Enabled Notaries',
        'Disabled Notaries',
        'Pending Notaries',
    ]

    // Event Handlers
    const handleRemove = (id) => {
        setNotaryData(notaryData.filter((notary) => notary.id !== id))
    }

    const handleOpenFileModal = (id) => {
        setSelectedNotaryId(id)
        setOpenFileModal(true)
    }

    const handleCloseFileModal = () => {
        setOpenFileModal(false)
        setSelectedNotaryId(null)
    }

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    // Filtered Data
    const filteredNotaryData = notaryData.filter((notary) => {
        const matchesFilter =
            selectedFilter === 'All Notaries' ||
            (selectedFilter === 'Enabled Notaries' && notary.status === 'Enabled') ||
            (selectedFilter === 'Disabled Notaries' && notary.status === 'Disabled') ||
            (selectedFilter === 'Pending Notaries' && notary.status === 'Pending')

        const matchesSearch =
            notary.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notary.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notary.city.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesFilter && matchesSearch
    })

    // Table Columns Definition
    const columns = [
        { label: 'ID', field: 'id' },
        { label: 'Full Name', field: 'fullName' },
        { label: 'Email', field: 'email' },
        { label: 'City', field: 'city' },
        {
            label: 'Certified Signing Agent',
            field: 'certified',
            render: (value) => (
                <Chip
                    label={value ? 'Certified' : 'Not Certified'}
                    sx={{
                        backgroundColor: value ? '#E6FFFA' : '#FA896B',
                        color: value ? '#5DEAD0' : 'white',
                        fontWeight: 'bold',
                    }}
                />
            ),
        },
        {
            label: 'Status',
            field: 'status',
            render: (value) => (
                <Chip
                    label={value}
                    sx={{
                        backgroundColor: value === 'Enabled' ? '#13DEB9' : '#FA896B',
                        color: 'white',
                    }}
                />
            ),
        },
    ]

    // Action Buttons Definition
    const actionButtons = [
        {
            label: 'Files',
            color: 'primary',
            onClick: handleOpenFileModal,
        },
        {
            label: 'Update',
            color: 'secondary',
            onClick: () => setShowTable(false),
        },
        {
            label: 'Delete',
            color: 'error',
            onClick: handleRemove,
        },
        {
            label: 'Disable',
            color: 'warning',
            onClick: (id) => alert(`Disable clicked for ${id}`),
        },
    ]

    return (
        <div>
            {showTable ? (
                <Box
                    sx={{
                        // border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        boxShadow: 1,
                        width: 1000,
                        // maxWidth: 'auto',
                        margin: 'auto',
                        marginTop: '20px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            padding: 2,
                        }}
                    >
                        {/* Header Section */}
                            <Heading heading={'All Notaries'}/>
                            
                        {/* Action and Search Section */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 2,
                            }}
                        >
                            <AddParticipant onClick={() => setShowTable(false)}>
                                Create
                            </AddParticipant>
                        </Box>
                        <Box  display={'flex'} flexDirection={'column'} alignItems={'flex-end'} justifyContent={'center'} gap={1}>
                        <FormControl variant="outlined" size="small" sx={{ width: '200px' }}>
                                <InputLabel id="notary-filter-label"></InputLabel>
                                <Select
                                    value={selectedFilter}
                                    onChange={handleFilterChange}
                                    label="Filter"
                                    sx={{ backgroundColor: '#6393e6', color: 'white' }}
                                >
                                    {notaryFilterOptions.map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Search handleSearch={handleSearchChange} />
                        </Box>

                        {/* Dynamic Table */}
                        <DynamicTable
                            columns={columns}
                            data={filteredNotaryData}
                            actions={actionButtons}
                            sx={{ marginTop: 2 }}
                        />
                    </Box>
                </Box>
            ) : (
                <NotaryInformation handleBack={() => setShowTable(true)} />
            )}

            {/* File Modal */}
            <FileModal open={openFileModal} handleClose={handleCloseFileModal} />
        </div>
    )
}

export default NotaryManagement
