import React, { useEffect, useState } from 'react'
import { Button, Typography, Box, Pagination, Paper } from '@mui/material'
import Swal from 'sweetalert2'
import DynamicTable from '../../components/dynamicTable/dynamicTable'
import UserForm from './form'
import FilterComponent from '../../components/FilterComponent/filterComponent'
import { initialUsers } from './data'
import Search from '../../components/Search/search'
import Heading from '../../components/Heading/heading'
import AddParticipant from '../../components/DynamicButton/DynamicButton'
import axios from 'axios'
const roles = ['Admin Users', 'Title Company Users', 'Notary Users', 'Client Users']
const privileges = [
    'Dashboard',
    'Notary Dashboard',
    'Notarize A Document',
    'Jobs List',
    'Title Company',
    'Notary Management',
    'User Management',
    'Services',
    'Client Management',
    'Menu Management',
    'Notarization Logs',
]

const UserManagement = () => {
    // State Management
    const [searchQuery, setSearchQuery] = useState('')
    const [users, setUsers] = useState(initialUsers)
    const [selectedFilter, setSelectedFilter] = useState('All Users')
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
        privileges: [],
    })
    const [isUpdateMode, setIsUpdateMode] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [dynamicData, setDynamicData] = useState([])
    const [page, setPage] = useState(dynamicData?.data?.currentPage)
    const [totalEntries, setTotalEntries] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)
    // Filter options
    const roleFilters = ['All Users', ...roles]
    const icons = [
        'All Users',
        'Admin Users',
        'Notary Users',
        'Title Company Users',
        'Client Users',
    ]

    // Event Handlers
    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value)
        setPage(1)
    }

    const handlePageChange = (event, value) => {
        setPage(value)
        getDynamicUsers(value)
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            })

            if (result.isConfirmed) {
                // Make the DELETE request
                await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/users/delete/${id}`)

                // Update the UI to remove the deleted user
                // setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
                setDynamicData((prevUsers) => prevUsers.filter((user) => user._id !== id))
                getDynamicUsers();

                // Show success alert
                Swal.fire('Deleted!', 'The user has been deleted.', 'success')
            }
        } catch (error) {
            console.error('Error deleting user:', error)
            Swal.fire('Error!', 'There was an issue deleting the user.', 'error')
        }
    }

    const handleUpdate =  (user ) => {
        setShowForm(true)
        console.log("user to be updated",user)
        setFormData({
            username: user.username,
            email: user.email,
            password: '',  
            role: user.role,
            privileges: user.privileges,
          });
          setSelectedUser(user);
          setIsUpdateMode(true);
    }

    const handleCreate = () => {
        setShowForm(true)
    }

    const handleSubmit = () => {
        if (!formData.username || !formData.email || !formData.role) {
            Swal.fire('Error', 'Please fill in all required fields', 'error')
            return
        }

        const newUser = {
            ...formData,
            status: 'Active',
            dateCreated: new Date().toLocaleString(),
        }
        setUsers([...users, newUser])
        resetForm()
    }
    
    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            role: '',
            privileges: [],
        })
        setShowForm(false)
    }

    const handleBack = () => {
        resetForm()
    }


    // Table Columns Definition
    const columns = [
        { id: 'username', label: 'User Name' },
        { id: 'email', label: 'Email' },
        { id: 'role', label: 'Role' },
        // { id: 'status', label: 'Status' },
        { id: 'createdAt', label: 'Date Created' },
        { id: 'actions', label: 'Actions' },
    ]

    const actionButton = (row) => (
        <Box display="flex" justifyContent="flex-end">
            <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{ marginRight: 1 }}
                onClick={()=>handleUpdate(row)}
            >
                Update
            </Button>
            <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleDelete(row._id)}
            >
                Delete
            </Button>
        </Box>
    )

    // get paginated users

    const getDynamicUsers = async (currentPage = 1) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/users/getusers?page=${currentPage}&pageSize=${pageSize}`,
            )
            console.log('Dynamic user', response.data.users)
            setDynamicData(response.data.users)
            setPage(response.data.currentPage)
            setTotalEntries(response.data.totalUsers)
            setPageSize(response.data.pageSize)
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.log('Error fetching dynamic users', error)
        }
    }

    useEffect(() => {
        getDynamicUsers()
    }, [])

    return (
        <Box sx={{ margin: 'auto', marginTop: '20px', maxWidth: 1000 }}>
            {showForm ? (
                <UserForm
                    formData={formData}
                    setFormData={setFormData}
                    roles={roles}
                    privileges={privileges}
                    handleSubmit={handleSubmit}
                    handleClose={handleBack}
                    isUpdateMode={isUpdateMode}
                    setIsUpdateMode={setIsUpdateMode}
                    selectedUser={selectedUser}
                />
            ) : (
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Heading heading="User Management" />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginY: 2,
                        }}
                    >
                        <AddParticipant onClick={handleCreate}>Create</AddParticipant>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <FilterComponent
                            selectedFilter={selectedFilter}
                            handleFilterChange={handleFilterChange}
                            roleFilters={roleFilters}
                            icons={icons}
                        />
                        <Search handleSearch={handleSearchChange} />
                    </Box>
                    <DynamicTable
                        columns={columns}
                        data={dynamicData}
                        actionButton={actionButton}
                    />
                    <Box sx={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>
                            Showing {(page - 1) * pageSize + 1} to{' '}
                            {Math.min(page * pageSize, totalEntries)} of {totalEntries} entries
                        </Typography>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            variant="outlined"
                            shape="rounded"
                        />
                    </Box>
                </Paper>
            )}
        </Box>
    )
}

export default UserManagement
