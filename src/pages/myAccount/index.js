import React, { useState } from 'react'
import { TextField, Button, Grid, Typography } from '@mui/material'
import Heading from '../../components/Heading/heading'
import axios from 'axios'
import Swal from 'sweetalert2'


 const MyAccount = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [username, setUserName] = useState()
    const [email, setUserEmail] = useState()
    const [currentPassword, setCurrentPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const handleChangeNameandEmail = async () => {
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_API_BASE_URL}/users/updateUserEmailName/${user._id}`,
                { username, email },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
            )
            console.log(response.data)
            localStorage.setItem('user', JSON.stringify(response?.data?.user))
            if (response.status === 200) {
                Swal.fire({
                    title: `${response?.data?.message}`,
                    icon: "success"
                  });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error updating password.",
                  });
            }
        } catch (error) {
            alert('Error: ' + error.response.data.message)
        }
    }
    const handleChangePass = async () => {
        try {
            
            const response = await axios.patch(
              `${import.meta.env.VITE_API_BASE_URL}/users/${user._id}/updateUserPassword`,
                { currentPassword, newPassword, confirmPassword },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
            )

            if (response.status === 200) {
                Swal.fire({
                    title: `${response?.message}`,
                    icon: "success"
                  });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error updating password.",
                  });
            }
        } catch (error) {cmd
        
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error?.response?.data?.message}`,
              });
        }
    }
    return (
        <div>
            <Heading heading={'My Account'} />

            <Grid container spacing={3} marginTop={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Account Details
                    </Typography>
                    <TextField
                        fullWidth
                        label="User Name"
                        margin="normal"
                        name="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Email Address"
                        margin="normal"
                        name="email"
                        value={email}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="User Role"
                        defaultValue={user.role}
                        margin="normal"
                        variant="filled"
                        InputProps={{ readOnly: true }}
                    />
                    <Button variant="contained" color="primary" onClick={handleChangeNameandEmail}>
                        Update
                    </Button>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Change Password
                    </Typography>
                    <TextField
                        fullWidth
                        label="Current Password"
                        type="password"
                        margin="normal"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        margin="normal"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        margin="normal"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        margin="10px"
                        variant="contained"
                        color="primary"
                        onClick={handleChangePass}
                    >
                        Change Password
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default MyAccount
