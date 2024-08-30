import { TextField } from '@mui/material'
import React from 'react'

const Search = ({ handleSearch }) => {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                <TextField size="small" placeholder="Search" onChange={handleSearch} />
            </div>
        </div>
    )
}

export default Search
