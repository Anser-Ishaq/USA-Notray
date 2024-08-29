import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import DynamicTable from '../../components/dynamicTable/dynamicTable';
import CreateOrUpdate from '../services/CreateOrUpdate/CreateOrUpdate';
import { Button } from '@mui/material';
import DynamicButton from '../../components/DynamicButton/DynamicButton';
import AddParticipant from '../../components/DynamicButton/DynamicButton';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PaymentsIcon from '@mui/icons-material/Payments';
import { bgcolor, display } from '@mui/system';

const TitleCompany = () => {
  const [editIndex, setEditIndex] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [filterStatus, setFilterStatus] = useState('Approved');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [jobsData, setJobsData] = useState([
    {
      CompanyName: 'SoftMark Solutions',
      ContactName: 'Abdul',
      Email: 'abc@gmail.com',
      City: 'Karachi',
      status: 'Approved',
    },
    {
      CompanyName: 'SoftMark Solutions',
      ContactName: 'John Doe',
      Email: 'john@gmail.com',
      City: 'Lahore',
      status: 'Pending',
    },
    {
      CompanyName: 'SoftMark Solutions',
      ContactName: 'Jane Doe',
      Email: 'jane@gmail.com',
      City: 'Islamabad',
      status: 'Pending',
    },
  ]);

  const columns = [
    { id: 'CompanyName', label: 'Company Name' },
    { id: 'ContactName', label: 'Contact Name' },
    { id: 'Email', label: 'Email' },
    { id: 'City', label: 'City' },
    { id: 'actions', label: 'Action' },
  ];

  const handleRemove = (index) => {
    setJobsData(jobsData.filter((_, i) => i !== index));
  };

  const handleUpdate = (index) => {
    setEditIndex(index);
    setShowTable(false);
  };

  const handleCreate = () => {
    setEditIndex(null);
    setShowTable(false);
  };

  const handleSave = () => {
    // Save logic goes here
  };

  const handleCancel = () => {
    setShowTable(true);
  };

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
  );

  const filteredJobs = jobsData.filter((job) => 
    job.status === filterStatus && 
    (job.CompanyName.toLowerCase().includes(searchQuery.toLowerCase()) || 
     job.ContactName.toLowerCase().includes(searchQuery.toLowerCase()) || 
     job.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
     job.City.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div>
        All Company List
      </div>
      <div style={{  display: 'flex', justifyContent: 'space-between' }}>
        <AddParticipant
          onClick={handleCreate}
          selected={false}
          style={{ backgroundColor: 'blue' }}
          >
          Create
        </AddParticipant>
      </div>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', }}>
        <div>All Title Company List</div>
     <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '20%',  }}
         de
        />


      </div>

        <div>
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

     

       
      {showTable && (
        <DynamicTable actionButton={renderActionButton} columns={columns} data={filteredJobs} />
      )}
      {!showTable && (
        <CreateOrUpdate
          formData={{}} 
          handleChange={() => {}}
          handleSave={handleSave}
          handleCancel={handleCancel}
          isEditMode={editIndex !== null}
        />
      )}
    </div>
  );
};

export default TitleCompany;
  