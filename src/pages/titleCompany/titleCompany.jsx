import React, { useState, useEffect } from 'react'
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
import axios from 'axios'
const TitleCompany = () => {
    // State hooks
    const [editIndex, setEditIndex] = useState(null)
    const [showTable, setShowTable] = useState(true)
    const [filterStatus, setFilterStatus] = useState('Approved')
    const [searchQuery, setSearchQuery] = useState('')
    const [jobsData, setJobsData] = useState(jobsdata)
    const user = JSON.parse(localStorage.getItem('user'))
    const [compData, setCompData] = useState([])
    const [updateCompData, setUpdateCompData] = useState()
    const [companyData, setCompanyData] = useState({
        companyName: '',
        preferredNotaryID: '',
        companyAddressLine1: '',
        companyAddressLine2: '',
        companyCity: '',
        companyState: '',
        companyZIP: '',
        primaryContactName: '',
        primaryContactNumber: '',
        primaryContactEmailAddress: '',
        timeZone1: '',
        secondaryContactName: '',
        secondaryContactNumber: '',
        secondaryContactEmailAddress: '',
        timeZone2: '',
        thirdContactName: '',
        thirdContactNumber: '',
        thirdContactEmailAddress: '',
        timeZone3: '',
        fourthContactName: '',
        fourthContactNumber: '',
        fourthContactEmailAddress: '',
        timeZone4: '',
        requireKBA: false,
        userId: user._id,
    })

    const handleCompanyData = (e) => {
        const { name, type, checked, value } = e.target // Get the checked state for checkboxes

        setCompanyData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value, // Set state based on type
        }))

        console.log('company name, value', name, type === 'checkbox' ? checked : value)
    }

    const handleStoreData = async () => {
        try {
            if (editIndex) {
                // Update existing company
                await axios.put(
                    `${import.meta.env.VITE_API_BASE_URL}/company/updateCompany/${editIndex}`,
                    companyData,
                )
                console.log('Company updated successfully')
                alert('Company updated successfully')
            } else {
                // Create new company
                await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/company/createCompany`,
                    companyData,
                )
                console.log('Company created successfully')
                alert('Company created successfully')
            }

            setEditIndex(null)
            setShowTable(true)
            handleFetchCompanyData()
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    }

    const handleFetchCompanyData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/company/getCompany`,
            )
            console.log('Full response data:', response.data)

            if (Array.isArray(response.data)) {
                setCompData(response.data)
            } else if (response.data.companies) {
                setCompData(response.data.companies)
            } else {
                console.error('Unexpected response structure:', response.data)
            }
        } catch (error) {
            console.error('Error fetching company data:', error)
        }
    }

    const columns = [
        { id: 'companyName', label: 'Company Name' },
        { id: 'primaryContactName', label: 'Contact Name' },
        { id: 'primaryContactEmailAddress', label: 'Email' },
        { id: 'companyCity', label: 'City' },
        { id: 'actions', label: 'Action' },
    ]

    // Handlers for actions
    const handleRemove = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/company/deleteCompany/${id}`)
            console.log('Company deleted successfully')
            alert('Company deleted successfully')
            handleFetchCompanyData()
        } catch (error) {
            console.error('Error deleting company:', error)
            alert('Error deleting company')
        }
    }

    const handleUpdate = async (id) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/company/companybyid/${id}`,
            )
            // if (Array.isArray(response.data)) {
            setCompanyData(response.data)
            console.log('response.data', response.data)

            // }
            setEditIndex(id)
            setShowTable(false)
        } catch (error) {
            console.error('Error fetching company details:', error)
        }
    }

    const handleCreate = () => {
        setEditIndex(null)
        setShowTable(false)
    }

    const handleSave = () => {
        setShowTable(true) // Return to table after saving
        handleStoreData()
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
                onClick={() => handleUpdate(row._id)}
                style={{ marginRight: '5px' }}
            >
                Update
            </Button>
            <Button variant="outlined" color="error" onClick={() => handleRemove(row._id)}>
                Delete
            </Button>
        </>
    )

    useEffect(() => {
        handleFetchCompanyData()
    }, [])

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
                        data={compData}
                    />
                </>
            ) : (
                <UserForm
                    editIndex={editIndex}
                    formData={companyData}
                    setFormData={setCompanyData}
                    handleCompanyData={handleCompanyData}
                    handleSubmit={handleSave}
                    handleClose={handleCancel}
                />
            )}
        </div>
    )
}

export default TitleCompany
