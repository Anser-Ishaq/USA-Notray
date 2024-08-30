import React, { useState } from 'react'
import DynamicTable from '../../../components/dynamicTable/dynamicTable'
import CreateOrUpdate from '../../../components/CreateOrUpdate/CreateOrUpdate'
import { Button } from '@mui/material'
import { AddParticipant } from '../../../components/DynamicButton/DynamicButton'
import defaultPricingData from './data'

const DefaultPricing = () => {
    const [editIndex, setEditIndex] = useState(null)
    const [showTable, setShowTable] = useState(true)
    const [editData, setEditData] = useState({
        serviceName: '',
        price: '',
        status: '',
        dateCreated: '',
    })
    const [jobsData, setJobsData] = useState(defaultPricingData)

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
            {showTable && (
           <>
            <div style={{ marginBottom: "30px" }} onClick={handleCreate}>
                <AddParticipant children={'Add new service'} />
            </div>

            
                <DynamicTable actionButton={renderActionButton} columns={columns} data={jobsData} />
           </>
            )}
            {!showTable && (
                <CreateOrUpdate
                    formData={editData}
                    handleChange={handleChange}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    isEditMode={editIndex !== null}
                    fields={fields}
                    isPrice={true}
                    close={()=>setShowTable(true)}
                />
            )}
        </div>
    )
}

export default DefaultPricing
