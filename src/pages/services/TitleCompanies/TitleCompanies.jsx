import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Button } from '@mui/material'
import AddParticipant from '../../../components/DynamicButton/DynamicButton'
import { titleCompany } from '../../../Data/OptionValues'
import DynamicTable from '../../../components/dynamicTable/dynamicTable'
import CreateOrUpdate from '../../../components/CreateOrUpdate/CreateOrUpdate'
import titleCompaniesData from './data'

const TitleCompanies = () => {
    // State hooks
    const [editIndex, setEditIndex] = useState(null)
    const [showTable, setShowTable] = useState(true)
    const [editData, setEditData] = useState({
        serviceName: '',
        price: '',
        status: '',
        dateCreated: '',
    })
    const [jobsData, setJobsData] = useState(titleCompaniesData)

    // Form fields configuration
    const fields = [
        { label: 'Enter Service Name', name: 'serviceName', required: true },
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

    // Table columns configuration
    const columns = [
        { id: 'serviceName', label: 'Service Name' },
        { id: 'price', label: 'Price' },
        { id: 'status', label: 'Status' },
        { id: 'dateCreated', label: 'Date Created' },
        { id: 'actions', label: 'Action' },
    ]

    // Remove a service from the list
    const handleRemove = (index) => {
        setJobsData(jobsData.filter((_, i) => i !== index))
    }

    // Set up for updating a service
    const handleUpdate = (index) => {
        setEditIndex(index)
        setEditData(jobsData[index])
        setShowTable(false)
    }

    // Set up for creating a new service
    const handleCreate = () => {
        setEditIndex(null)
        setEditData({
            serviceName: '',
            price: '',
            status: '',
            dateCreated: '',
        })
        setShowTable(false)
    }

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setEditData({
            ...editData,
            [name]: value,
        })
    }

    // Save the form data
    const handleSave = () => {
        const updatedJobsData = [...jobsData]
        if (editIndex !== null) {
            updatedJobsData[editIndex] = {
                ...editData,
                price: parseFloat(editData.price),
            }
        } else {
            updatedJobsData.push({
                ...editData,
                price: parseFloat(editData.price),
                dateCreated: new Date().toLocaleString(),
            })
        }
        setJobsData(updatedJobsData)
        setEditIndex(null)
        setEditData({
            serviceName: '',
            price: '',
            status: '',
            dateCreated: '',
        })
        setShowTable(true)
    }

    // Cancel the current operation
    const handleCancel = () => {
        setEditIndex(null)
        setShowTable(true)
    }

    // Render action buttons for each row
    const renderActionButton = (row, index) => (
        <>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => handleUpdate(index)}
                style={{ marginRight: '5px' }}
            >
                Update
            </Button>
            <Button variant="outlined" color="error" onClick={() => handleRemove(index)}>
                Delete
            </Button>
        </>
    )

    return (
        <div>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={titleCompany}
                sx={{ width: 400, marginBottom: '20px' }}
                renderInput={(params) => <TextField {...params} label="Title Company" />}
            />
            {showTable ? (
                <>
                    <div style={{ marginTop: '20px', marginBottom: '30px' }} onClick={handleCreate}>
                        <AddParticipant children={'Add new service'} />
                    </div>
                    <DynamicTable
                        actionButton={renderActionButton}
                        columns={columns}
                        data={jobsData}
                    />
                </>
            ) : (
                <CreateOrUpdate
                    formData={editData}
                    handleChange={handleChange}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    isEditMode={editIndex !== null}
                    isPrice={true}
                    fields={fields}
                    close={() => setShowTable(true)}
                />
            )}
        </div>
    )
}

export default TitleCompanies
