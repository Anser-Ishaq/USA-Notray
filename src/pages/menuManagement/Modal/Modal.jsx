import React, { useState, useEffect } from 'react'
import {
    Box,
    IconButton,
    Typography,
    Slide,
    useTheme,
    Chip,
    Modal,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DynamicTable2 from '../../../components/dynamicTable/dynamicTable2'
import { AddParticipant, BackButton } from '../../../components/DynamicButton/DynamicButton'
import CreateOrUpdate from '../../../components/CreateOrUpdate/CreateOrUpdate'

const FileModal = ({ open, handleClose, notaryItem }) => {
    const theme = useTheme()
    const [showTable, setShowTable] = useState(true)
    const [editData, setEditData] = useState({
        submenuName: '',
        submenuURL: '',
        status: 'Active',
    })
    const [editIndex, setEditIndex] = useState(null)
    const [subMenuData, setSubMenuData] = useState(notaryItem?.submenus || [])

    useEffect(() => {
        setSubMenuData(notaryItem?.submenus || [])
    }, [notaryItem])

    const columns = [
        { label: 'Order', field: 'order' },
        { label: 'Submenu', field: 'submenuName' },
        { label: 'Submenu URL', field: 'submenuURL' },
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

    const actionButtons = [
        {
            label: 'Update',
            color: 'secondary',
            onClick: (index) => handleEdit(index),
        },
        {
            label: 'Delete',
            color: 'error',
            onClick: (index) => handleRemove(index),
        },
    ]

    const fields = [
        { label: 'Enter Submenu Name', name: 'submenuName', required: true },
        { label: 'Enter Submenu URL', name: 'submenuURL', required: true },
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

    const handleCreateSubMenu = () => {
        setEditData({
            submenuName: '',
            submenuURL: '',
            status: 'Active',
        })
        setEditIndex(null)
        setShowTable(false)
    }

    const handleEdit = (index) => {
        const submenu = subMenuData[index]
        setEditData(submenu)
        setEditIndex(index)
        setShowTable(false)
    }

    const handleRemove = (index) => {
        const updatedSubMenuData = subMenuData.filter((_, i) => i !== index)
        setSubMenuData([...updatedSubMenuData])
        console.log("Deleted index:", index)
        console.log("Updated subMenuData:", updatedSubMenuData)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditData({
            ...editData,
            [name]: value,
        })
    }

    const handleSave = () => {
        if (!Array.isArray(subMenuData)) {
            console.error('subMenuData is not an array:', subMenuData)
            return
        }

        if (editIndex === null) {
            const newSubMenuData = [
                ...subMenuData,
                {
                    order: subMenuData.length + 1,
                    submenuName: editData.submenuName,
                    submenuURL: editData.submenuURL,
                    status: editData.status,
                },
            ]
            setSubMenuData(newSubMenuData)
        } else {
            const updatedSubMenuData = subMenuData.map((item, index) =>
                index === editIndex
                    ? { ...editData, order: item.order }
                    : item
            )
            setSubMenuData(updatedSubMenuData)
        }
        setShowTable(true)
    }

    const handleCancel = () => {
        setShowTable(true)
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto',
            }}
        >
            <Slide direction="down" in={open} mountOnEnter unmountOnExit>
                <Box
                    sx={{
                        width: { xs: '90%', sm: 800, md: 900 },
                        backgroundColor: 'background.paper',
                        borderRadius: '12px',
                        boxShadow: 24,
                        position: 'relative',
                        height: '90vh',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: '8px',
                            right: '16px',
                            color: 'text.secondary',
                        }}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: 'white',
                            padding: '12px',
                            borderRadius: '1px',
                        }}
                    >
                         {notaryItem ? `Menu Level 1(${notaryItem.name})` : 'Menu Level 1'}
                    </Typography>

                    <Box sx={{ p: 2, overflowY: 'auto', flexGrow: 1 }}>
                        {showTable ? (
                            <>
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
                                        Sub Menu List
                                    </Typography>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '40%',
                                        marginTop: '10px',
                                    }}
                                >
                                    <AddParticipant
                                        children={'Create Sub Menu'}
                                        onClick={handleCreateSubMenu}
                                    />
                                </div>
                                <DynamicTable2
                                    columns={columns}
                                    data={subMenuData}
                                    actions={actionButtons.map((button, i) => ({
                                        ...button,
                                        onClick: () => button.onClick(i),
                                    }))}
                                />
                            </>
                        ) : (
                            <>
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
                                Create Menu
                            </Typography>
                        </div>
                            <CreateOrUpdate
                                formData={editData}
                                handleChange={handleChange}
                                handleSave={handleSave}
                                handleCancel={handleCancel}
                                isEditMode={editIndex !== null}
                                fields={fields}
                                submenu={true}
                                close={()=>setShowTable(true)}
                            />
                            </>
                        )}
                    </Box>
                </Box>
            </Slide>
        </Modal>
    )
}

export default FileModal
