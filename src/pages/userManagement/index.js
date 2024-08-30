import React, { useState } from 'react';
import {
    Button,
    Typography,
    Box,
    Pagination,
    Paper,
} from '@mui/material';
import Swal from 'sweetalert2';
import DynamicTable from '../../components/dynamicTable/dynamicTable';
import UserForm from './form';
import FilterComponent from '../../components/FilterComponent/filterComponent';
import { initialUsers } from './data';
import Search from '../../components/Search/search';
import Heading from '../../components/Heading/heading';
import AddParticipant from '../../components/DynamicButton/DynamicButton';

const roles = ['Admin Users', 'Title Company Users', 'Notary Users', 'Client Users'];
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
];

const UserManagement = () => {
    // State Management
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState(initialUsers);
    const [selectedFilter, setSelectedFilter] = useState('All Users');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
        privileges: [],
    });
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    // Filter options
    const roleFilters = ['All Users', ...roles];
    const icons = ['All Users', 'Admin Users', 'Notary Users', 'Title Company Users', 'Client Users'];

    // Event Handlers
    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
        setPage(1);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = (username) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                setUsers(users.filter((user) => user.username !== username));
                Swal.fire('Deleted!', 'The user has been deleted.', 'success');
            }
        });
    };

    const handleCreate = () => {
        setShowForm(true);
    };

    const handleSubmit = () => {
        if (!formData.username || !formData.email || !formData.role) {
            Swal.fire('Error', 'Please fill in all required fields', 'error');
            return;
        }

        const newUser = {
            ...formData,
            status: 'Active',
            dateCreated: new Date().toLocaleString(),
        };
        setUsers([...users, newUser]);
        resetForm();
    };

    const handleBack = () => {
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            role: '',
            privileges: [],
        });
        setShowForm(false);
    };

    // Filtering and Pagination
    const filteredUsers = users
        .filter((user) => selectedFilter === 'All Users' || user.role === selectedFilter)
        .filter((user) => {
            const query = searchQuery.toLowerCase();
            return (
                user.username.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.role.toLowerCase().includes(query)
            );
        });

    const totalEntries = filteredUsers.length;
    const paginatedUsers = filteredUsers.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    const totalPages = Math.ceil(totalEntries / rowsPerPage);

    // Table Columns Definition
    const columns = [
        { id: 'username', label: 'User Name' },
        { id: 'email', label: 'Email' },
        { id: 'role', label: 'Role' },
        { id: 'status', label: 'Status' },
        { id: 'dateCreated', label: 'Date Created' },
        { id: 'actions', label: 'Actions' },
    ];

    const actionButton = (row) => (
        <Box display="flex" justifyContent="flex-end">
            <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{ marginRight: 1 }}
                onClick={() => setShowForm(true)}
            >
                Update
            </Button>
            <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleDelete(row.username)}
            >
                Delete
            </Button>
        </Box>
    );

    return (
        <Box sx={{ margin: 'auto', marginTop: '20px', maxWidth: 900 }}>
            {showForm ? (
                <UserForm
                    formData={formData}
                    setFormData={setFormData}
                    roles={roles}
                    privileges={privileges}
                    handleSubmit={handleSubmit}
                    handleClose={handleBack}
                />
            ) : (
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Heading heading="User Management" />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 2 }}>
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
                    <DynamicTable columns={columns} data={paginatedUsers} actionButton={actionButton} />
                    <Box sx={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>
                            Showing {Math.min((page - 1) * rowsPerPage + 1, totalEntries)} to{' '}
                            {Math.min(page * rowsPerPage, totalEntries)} of {totalEntries} entries
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
    );
};

export default UserManagement;
