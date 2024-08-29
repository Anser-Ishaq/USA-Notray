import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, IconButton, Switch, Pagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DynamicTable from '../../components/dynamicTable/dynamicTable';
import Swal from 'sweetalert2';

const ClientManagementLayout = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const columns = [
    { id: 'fullName', label: 'Full Name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'address', label: 'Address' },
    { id: 'city', label: 'City' },
    { id: 'signature', label: 'Signature' },
    { id: 'govtId', label: 'Govt ID' },
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions' },
  ];

  const initialData = [
    {
      fullName: 'Andrew',
      email: 'ryon341-4@gmail.com',
      phone: '18047677500',
      address: '13518 Deer Creek Road',
      city: 'Ashland',
      signature: '-',
      govtId: '-',
      status: 'Disabled',
    },
    {
      fullName: 'Andrew R. Yon',
      email: 'ryon341-1@gmail.com',
      phone: '8047677500',
      address: '11357 Nuckols Rd',
      city: 'Glen Allen',
      signature: '-',
      govtId: '-',
      status: 'Enabled',
    },
  ];

  const [data, setData] = useState(initialData);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (row) => {
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
        setData(data.filter((client) => client.email !== row.email));
        Swal.fire('Deleted!', 'The client has been deleted.', 'success');
      }
    });
  };

 
  const paginatedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h6">Client Management</Typography>


      <DynamicTable
        columns={columns}
        data={paginatedData}
        actionButton={(row) => (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton color="error" size="small" onClick={() => handleDelete(row)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginY: '16px' }}>
        <Typography>
          Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, data.length)} of {data.length} entries
        </Typography>
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default ClientManagementLayout;
