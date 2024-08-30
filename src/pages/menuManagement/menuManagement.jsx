import React, { useState } from 'react'
import { Box, Typography, Chip, TextField } from '@mui/material'
import AddParticipant from '../../components/DynamicButton/DynamicButton'
import DynamicTable from '../../components/dynamicTable/dynamicTable2'
import CreateOrUpdate from '../../components/CreateOrUpdate/CreateOrUpdate'
import FileModal from './Modal/Modal'
import menuData from './data'
import Heading from '../../components/Heading/heading'
import Search from '../../components/Search/search'

const MenuManagement = () => {
    // State management
    const [openFileModal, setOpenFileModal] = useState(false)
    const [selectedNotary, setSelectedNotary] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [editIndex, setEditIndex] = useState(null)
    const [showTable, setShowTable] = useState(true)
    const [editData, setEditData] = useState({
        name: '',
        icon: '',
        url: '',
        status: 'Active',
    })

    const [notaryData, setNotaryData] = useState(menuData)

    // Handle removing an entry
    const handleRemove = (id) => {
        setNotaryData(notaryData.filter((notary) => notary.id !== id))
    }

    // Open modal for file operations
    const handleOpenFileModal = (id) => {
        const item = notaryData.find((notary) => notary.id === id)
        setSelectedNotary(item)
        setOpenFileModal(true)
    }

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    // Filtered notary data based on search query
    const filteredNotaryData = notaryData.filter((notary) => {
        return notary.name.toLowerCase().includes(searchQuery.toLowerCase())
    })

    // Handle editing an entry
    const handleEdit = (id) => {
        const item = notaryData.find((notary) => notary.id === id)
        if (item) {
            setEditIndex(id)
            setEditData(item)
            setShowTable(false)
        }
    }

    // Table columns definition
    const columns = [
        { label: 'Order', field: 'order' },
        { label: 'Name', field: 'name' },
        { label: 'Icon', field: 'icon' },
        { label: 'URL', field: 'url' },
        {
            label: 'Status',
            field: 'status',
            render: (value) => (
                <Chip
                    label={value}
                    sx={{
                        backgroundColor: value === 'Active' ? '#13DEB9' : '#FA896B',
                        color: 'white',
                    }}
                />
            ),
        },
    ]

    // Form fields definition
    const fields = [
        { label: 'Enter Menu Name', name: 'name', required: true },
        { label: 'Enter Menu Icon', name: 'icon', required: true },
        { label: 'Enter Menu URL', name: 'url', required: true },
        {
            label: 'Status',
            name: 'status',
            type: 'select',
            select: true,
            options: [
                { label: 'Active', value: 'Active' },
                { label: 'Inactive', value: 'Inactive' },
            ],
        },
    ]

    // Action buttons configuration
    const actionButtons = [
        {
            label: 'SubMenu',
            color: 'primary',
            onClick: (id) => handleOpenFileModal(id),
        },
        {
            label: 'Update',
            color: 'secondary',
            onClick: (id) => handleEdit(id),
        },
        {
            label: 'Delete',
            color: 'error',
            onClick: (id) => handleRemove(id),
        },
    ]

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setEditData({
            ...editData,
            [name]: value,
        })
    }

    // Handle saving data (add or update)
    const handleSave = () => {
        if (editIndex === null) {
            setNotaryData([
                ...notaryData,
                {
                    ...editData,
                    id: notaryData.length + 1,
                    order: notaryData.length + 1,
                },
            ])
        } else {
            setNotaryData(
                notaryData.map((item) =>
                    item.id === editIndex ? { ...editData, id: editIndex } : item,
                ),
            )
        }
        setEditIndex(null)
        setEditData({
            name: '',
            icon: '',
            url: '',
            status: 'Active',
        })
        setShowTable(true)
    }

    // Handle canceling edit
    const handleCancel = () => {
        setEditIndex(null)
        setShowTable(true)
    }

    return (
        <Box
            sx={{
                padding: 5,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                boxShadow: 2,
                width: 900,
                margin: 'auto',
                marginTop: '20px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <Heading heading={showTable ? 'Menu List' : 'Create Menu'} />
                </Box>

                {showTable && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            flexDirection: 'column',
                            marginTop: '20px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <AddParticipant
                                children={'Create'}
                                onClick={() => setShowTable(false)}
                            />
                            <AddParticipant children={'Switch Menu Live URL'} />
                        </Box>
                        <Search handleSearch={handleSearchChange} />
                    </Box>
                )}
            </Box>

            {showTable ? (
                <DynamicTable
                    columns={columns}
                    data={filteredNotaryData}
                    actions={actionButtons.map((button) => ({
                        ...button,
                        onClick: (id) => button.onClick(id),
                    }))}
                />
            ) : (
                <CreateOrUpdate
                    formData={editData}
                    handleChange={handleChange}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    isEditMode={editIndex !== null}
                    fields={fields}
                    note={true}
                    close={() => setShowTable(true)}
                />
            )}

            <FileModal
                open={openFileModal}
                handleClose={() => setOpenFileModal(false)}
                notaryItem={selectedNotary}
            />
        </Box>
    )
}

export default MenuManagement
