import React, { useState } from 'react';
import {
  Button, TextField, MenuItem, Typography, Box, Select, FormControl, InputLabel, Pagination, Paper,
} from '@mui/material';
import Swal from 'sweetalert2';
import DynamicTable from '../../components/dynamicTable/dynamicTable';
import UserForm from './form.jsx';

const initialUsers = [
  {
    username: 'macrae@eaglegatetitle.com',
    email: 'macrae@eaglegatetitle.com',
    role: 'Title Company Users',
    status: 'Active',
    dateCreated: '07 Jun 24 - 04:41 PM',
  },
  {
    username: 'admin@admin.com',
    email: 'admin@admin.com',
    role: 'Admin Users',
    status: 'Active',
    dateCreated: '07 Jun 24 - 04:44 PM',
  },
  {
    username: 'notary@notary.com',
    email: 'notary@notary.com',
    role: 'Notary Users',
    status: 'Active',
    dateCreated: '07 Jun 24 - 04:45 PM',
  },
  {
    username: 'client@client.com',
    email: 'client@client.com',
    role: 'Client Users',
    status: 'Inactive',
    dateCreated: '07 Jun 24 - 04:46 PM',
  },
];

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
  const rowsPerPage = 5;

  const roleFilters = ['All Users', ...roles];
 
  const icons = [
    "All Users",
    "Admin Users",
    "Notary Users",
    "Title Company Users",
    "Client Users"
  ];

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
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

    setFormData({
      username: '',
      email: '',
      password: '',
      role: '',
      privileges: [],
    });
    setShowForm(false);
  };

  const handleBack = () => {
    setShowForm(false);
  };

  const filteredUsers = users.filter((user) => selectedFilter === 'All Users' || user.role === selectedFilter);

  const totalEntries = filteredUsers.length;
  const startIndex = (page - 1) * rowsPerPage + 1;
  const endIndex = Math.min(page * rowsPerPage, totalEntries);
  const totalPages = Math.ceil(totalEntries / rowsPerPage);

  const paginatedUsers = filteredUsers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {!showForm && (
          <Button variant="outlined" color="primary" onClick={handleCreate} size="small" sx={{ marginRight: 1 }}>
            Update
          </Button>
        )}
      </Box>
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {!showForm && (
          <Button variant="contained" color="primary" onClick={handleCreate} style={{ marginTop: '20px', marginLeft: '20px' }}>
            Create
          </Button>
        )}
      </Box>

      {!showForm ? (
        <>
          <Typography variant="h6" color="textPrimary" sx={{ marginLeft: '20px', marginTop: '20px' }}>
            User Management
          </Typography>

          <Box display="flex" flexDirection="column" alignItems="flex-end" mr={3}>
            <FormControl variant="outlined" size="small" sx={{ width: '200px', mb: 1 }}>
              <InputLabel id="role-filter-label"></InputLabel>
              <Select
                value={selectedFilter}
                onChange={handleFilterChange}
                style={{ backgroundColor: '#6393e6', color: 'white' }}
              >
                {roleFilters.map((filter) => (
                  <MenuItem key={filter} value={filter}>
                    {icons[filter]} {filter}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField variant="outlined" size="small" placeholder="Search" sx={{ width: '200px' }} />
          </Box>

          <DynamicTable columns={columns} data={paginatedUsers} actionButton={actionButton} />

          <Box sx={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <Typography>
              Showing {startIndex} to {endIndex} of {totalEntries} entries
            </Typography>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </>
      ) : (
        <UserForm
          formData={formData}
          setFormData={setFormData}
          roles={roles}
          privileges={privileges}
          handleSubmit={handleSubmit}
          handleClose={handleBack}
        />
      )}
    </Paper>
  );
};

export default UserManagement;
