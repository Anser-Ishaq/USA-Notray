import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';
import UsaLogo from '../../../assets/usalogo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const LoginPage = ( ) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()

  const onSubmit =async (data) => {
    console.log(data);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        data,
    )
    console.log('User login:', response.data)
    const {token, user,message} = response?.data;
      localStorage.setItem('auth', "true")
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", token)
      alert(message)
      navigate('/dashboard');
    } catch (error) {
      console.log(" error while login", error)
      alert(error.response.data.message)
    }
  };

  return (
    <Container>
      <FormContainer>
        <Logo src={UsaLogo} alt="Logo" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            size='small'
            margin="normal"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
             size='small'
            margin="normal"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
          <Link href="#" variant="body2" sx={{ display: 'block', margin: '16px 0' }}>
            Forgot Password?
          </Link>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default LoginPage;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'radial-gradient(rgba(210, 241, 223, 0.3), rgba(211, 215, 250, 0.3), rgba(186, 216, 244, 0.3)) 0 0 / 400% 400%',
 
  width: '100vw',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: 40,
  borderRadius: 10,
  boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
  textAlign: 'center',
  width: '100%',
  maxWidth: '400px',
}));

const Logo = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(3),
  width: '150px',
}));
