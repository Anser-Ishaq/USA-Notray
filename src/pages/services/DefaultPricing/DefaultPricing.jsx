import React, { useState } from 'react'
import DynamicTable from '../../../components/dynamicTable/dynamicTable'
import CreateOrUpdate from '../CreateOrUpdate/CreateOrUpdate'
import { Button } from '@mui/material'
import { AddParticipant } from '../../../components/DynamicButton/DynamicButton'

const DefaultPricing = () => {
    const [editIndex, setEditIndex] = useState(null)
    const [showTable, setShowTable] = useState(true)
    const [editData, setEditData] = useState({
        serviceName: '',
        price: '',
        status: '',
        dateCreated: '',
    })
    const [jobsData, setJobsData] = useState([
        {
            serviceName: 'Title Closing Seller Side', 
            price: 25,
            dateCreated: '05 Dec 23 - 03:23 PM',
            status: 'Active',
        },
        {
            serviceName: 'Single Document',
            price: 30,
            dateCreated: '05 Dec 23 - 03:23 PM',
            status: 'Inactive',
        },
        {
            serviceName: 'Title Closing Buyers Side With Loans',
            price: 50,
            dateCreated: '05 Dec 23 - 03:23 PM',
            status: 'Inactive',
        },
        {
            serviceName: 'Title Closing Buyers Side',
            price: 100,
            dateCreated: '05 Dec 23 - 03:23 PM',
            status: 'Active',
        },
    ])

    const columns = [
        { id: 'serviceName', label: 'Service Name' },
        { id: 'price', label: 'Price' },
        { id: 'status', label: 'Status' },
        { id: 'dateCreated', label: 'Date Created' },
        { id: 'actions', label: 'Action' },
    ]

    const handleRemove = (index) => {
        setJobsData(jobsData.filter((_, i) => i !== index))
    }

    const handleUpdate = (index) => {
        setEditIndex(index)
        setEditData(jobsData[index])
        setShowTable(false)
    }

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

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditData({
            ...editData,
            [name]: value,
        })
    }

    const handleSave = () => {
        const updatedJobsData = [...jobsData]
        if (editIndex !== null) {
            updatedJobsData[editIndex] = { ...editData, price: parseFloat(editData.price) }
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

    const handleCancel = () => {
        setEditIndex(null)
        setShowTable(true)
    }

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
            <div style={{ marginBottom: "30px" }} onClick={handleCreate}>
                <AddParticipant children={'Add new service'} />
            </div>

            {showTable && (
                <DynamicTable actionButton={renderActionButton} columns={columns} data={jobsData} />
            )}
            {!showTable && (
                <CreateOrUpdate
                    formData={editData}
                    handleChange={handleChange}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    isEditMode={editIndex !== null}
                />
            )}
        </div>
    )
}

export default DefaultPricing
