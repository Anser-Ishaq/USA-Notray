import React, { useState } from 'react'
import { Box, Typography, Chip, TextField } from '@mui/material'
import AddParticipant, { BackButton } from '../../components/DynamicButton/DynamicButton'
import DynamicTable from '../../components/dynamicTable/dynamicTable2'
import CreateOrUpdate from '../../components/CreateOrUpdate/CreateOrUpdate'
import FileModal from './Modal/Modal'

const MenuManagement = () => {
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

    const [notaryData, setNotaryData] = useState([
        {
            id: 1,
            order: 1,
            name: 'Dashboard',
            icon: 'ti ti-home',
            url: '/dashboard',
            status: 'Active',
        },
        {
            id: 2,
            order: 2,
            name: 'Notary Dashboard',
            icon: 'ti ti-home',
            url: '-',
            status: 'Active',
        },
        {
            id: 3,
            order: 3,
            name: 'Job Management',
            icon: 'ti ti-files',
            url: '-',
            status: 'Active',
        },
        {
            id: 4,
            order: 4,
            name: 'Title Management',
            icon: 'ti ti-building',
            url: '/title-company',
            status: 'Active',
        },
        {
            id: 5,
            order: 5,
            name: 'Notary Management',
            icon: 'ti ti-certificate',
            url: '/notary-management',
            status: 'Active',
        },
        {
            id: 6,
            order: 6,
            name: 'User Management',
            icon: 'ti ti-users',
            url: '/user-management',
            status: 'Active',
        },
        {
            id: 7,
            order: 7,
            name: 'Services',
            icon: 'ti ti-settings',
            url: '/services',
            status: 'Active',
        },
        {
            id: 8,
            order: 8,
            name: 'Client Management',
            icon: 'ti ti-edit',
            url: '/client-management',
            status: 'Active',
        },
        {
            id: 9,
            order: 9,
            name: 'Menu Management',
            icon: 'ti ti-category',
            url: '/menu-management',
            status: 'Active',
        },
        {
            id: 10,
            order: 10,
            name: 'Notarization Logs',
            icon: 'ti ti-book',
            url: '/notarization-logs',
            status: 'Active',
        },
    ])

    const handleRemove = (id) => {
        setNotaryData(notaryData.filter((notary) => notary.id !== id))
    }

    const handleOpenFileModal = (id) => {
        const item = notaryData.find((notary) => notary.id === id)
        setSelectedNotary(item)
        setOpenFileModal(true)
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    const filteredNotaryData = notaryData.filter((notary) => {
        return notary.name.toLowerCase().includes(searchQuery.toLowerCase())
    })

    const handleEdit = (id) => {
        const item = notaryData.find((notary) => notary.id === id)
        if (item) {
            setEditIndex(id)
            setEditData(item)
            setShowTable(false)
        }
    }

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

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditData({
            ...editData,
            [name]: value,
        })
    }

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

    const handleCancel = () => {
        setEditIndex(null)
        setShowTable(true)
    }

    return (
        <div>
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
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            width: '100%',
                        }}
                    >
                        <Typography variant="h6" component="div">
                            {showTable ? 'Menu List' : 'Create Menu'}
                        </Typography>
                    </div>
                    {showTable && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                width: '100%',
                                marginTop: '20px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '40%',
                                }}
                            >
                                <AddParticipant
                                    children={'Create'}
                                    onClick={() => setShowTable(false)}
                                />
                                <AddParticipant children={'Switch Menu Live URL'} />
                            </div>

                            <TextField
                                size="small"
                                placeholder="Search"
                                onChange={handleSearchChange}
                            />
                        </div>
                    )}
                </Box>
                {showTable && (
                    <DynamicTable
                        columns={columns}
                        data={filteredNotaryData}
                        actions={actionButtons.map((button) => ({
                            ...button,
                            onClick: (id) => button.onClick(id),
                        }))}
                    />
                )}
                {!showTable && (
                    <>

                        <CreateOrUpdate
                            formData={editData}
                            handleChange={handleChange}
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                            isEditMode={editIndex !== null}
                            fields={fields}
                            note={true}
                            close={()=>setShowTable(true)}
                        />
                    </>
                )}
            </Box>
            <FileModal
                open={openFileModal}
                handleClose={() => setOpenFileModal(false)}
                notaryItem={selectedNotary}
            />
        </div>
    )
}

export default MenuManagement
