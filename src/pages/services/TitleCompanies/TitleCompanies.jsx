import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { titleCompany } from '../../../Data/OptionValues'
import DynamicTable from '../../../components/dynamicTable/dynamicTable'

const TitleCompanies = () => {
    const columns = [
        { id: 'signerName', label: 'Name' },
        { id: 'signerEmail', label: 'Email' },
        { id: 'phoneNumber', label: 'Phone' },
        { id: 'role', label: 'Role' },
        { id: 'actions', label: 'Action' }
      ];

    return (
        <div>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={titleCompany}
                sx={{ width: 400 }}
                renderInput={(params) => <TextField {...params} label="Title Company" />}
            />
            {/* <DynamicTable columns={columns}/> */}
        </div>
    )
}

export default TitleCompanies
