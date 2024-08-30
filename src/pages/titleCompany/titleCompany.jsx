import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import DynamicButton from '../../components/DynamicButton/DynamicButton'
import ApartmentIcon from '@mui/icons-material/Apartment'
import PaymentsIcon from '@mui/icons-material/Payments'
import DynamicTable from '../../components/dynamicTable/dynamicTable'
import UserForm from './form' // Renamed to better reflect its function
import Heading from '../../components/Heading/heading'
import { jobsdata } from './data'
import Search from '../../components/Search/search'

const TitleCompany = () => {
    // State hooks
    const [editIndex, setEditIndex] = useState(null)
    const [showTable, setShowTable] = useState(true)
    const [filterStatus, setFilterStatus] = useState('Approved')
    const [searchQuery, setSearchQuery] = useState('')
    const [jobsData, setJobsData] = useState(jobsdata)

    // Columns configuration for the table
    const columns = [
        { id: 'CompanyName', label: 'Company Name' },
        { id: 'ContactName', label: 'Contact Name' },
        { id: 'Email', label: 'Email' },
        { id: 'City', label: 'City' },
        { id: 'actions', label: 'Action' },
    ]

    // Handlers for actions
    const handleRemove = (index) => {
        setJobsData(jobsData.filter((_, i) => i !== index))
    }

    const handleUpdate = (index) => {
        setEditIndex(index)
        setShowTable(false)
    }

    const handleCreate = () => {
        setEditIndex(null)
        setShowTable(false)
    }

    const handleSave = () => {
        setShowTable(true) // Return to table after saving
    }

    const handleCancel = () => {
        setShowTable(true)
    }

    // Render action buttons for the table rows
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

    // Filtering jobs based on status and search query
    const filteredJobs = jobsData.filter(
        (job) =>
            job.status === filterStatus &&
            [job.CompanyName, job.ContactName, job.Email, job.City].some((field) =>
                field.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
    )

    return (
        <div>
            {showTable ? (
                <>
                    <Heading heading={'All Title Company List'} />

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '20px',
                        }}
                    >
                        <DynamicButton
                            onClick={handleCreate}
                            selected={false}
                            style={{ backgroundColor: 'blue' }}
                        >
                            Create
                        </DynamicButton>

                        <Search handleSearch={(e) => setSearchQuery(e.target.value)} />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <DynamicButton
                            onClick={() => setFilterStatus('Approved')}
                            selected={filterStatus === 'Approved'}
                            icon={ApartmentIcon}
                        >
                            Approved
                        </DynamicButton>
                        <DynamicButton
                            onClick={() => setFilterStatus('Pending')}
                            selected={filterStatus === 'Pending'}
                            icon={PaymentsIcon}
                        >
                            Pending
                        </DynamicButton>
                    </div>

                    <DynamicTable
                        actionButton={renderActionButton}
                        columns={columns}
                        data={filteredJobs}
                    />
                </>
            ) : (
                <UserForm
                    formData={editIndex !== null ? jobsData[editIndex] : {}}
                    setFormData={(updatedData) => {
                        if (editIndex !== null) {
                            const updatedJobs = [...jobsData]
                            updatedJobs[editIndex] = updatedData
                            setJobsData(updatedJobs)
                        } else {
                            setJobsData([...jobsData, updatedData])
                        }
                    }}
                    handleSubmit={handleSave}
                    handleClose={handleCancel}
                />
            )}
        </div>
    )
}

export default TitleCompany
