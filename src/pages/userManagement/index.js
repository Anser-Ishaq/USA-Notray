import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  TextField,
  MenuItem,
} from '@mui/material';

const users = [
  {
    username: 'macrae@eaglegatetitle.com',
    email: 'macrae@eaglegatetitle.com',
    role: 'Title Company',
    status: 'Active',
    dateCreated: '07 Jun 24 - 04:41 PM',
  },
  {
    username: 'contact@easterntitle.com',
    email: 'contact@easterntitle.com',
    role: 'Title Company',
    status: 'Active',
    dateCreated: '07 Jun 24 - 04:44 PM',
  },
  // Add more users as per your data
];

const UserManagement = () => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary">
          Create
        </Button>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          sx={{ width: '200px' }}
        />
      </div>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.dateCreated}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" color="primary" size="small" sx={{ marginRight: 1 }}>
                    Update
                  </Button>
                  <Button variant="outlined" color="error" size="small">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <span>Showing 1 to 10 of 144 entries</span>
        <Pagination count={15} variant="outlined" shape="rounded" />
      </div>
    </Paper>
  );
};

export default UserManagement;
