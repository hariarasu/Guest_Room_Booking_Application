import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Login } from '../Assest/assest';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { setAuth, setRole, setId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem("role",data.role);
      localStorage.setItem("id",data.id);
      setAuth(true); 
      setRole(data.role);
      setId(data.id);
      toast.success('Login successful!');
      navigate('/home');
    } catch (error) {
      console.error(error);
      toast.error('Login failed!');
    }
  };

  return (
    <div className='flex justify-center h-screen items-center'>
      <div className='w-[50%] h-[70%] flex justify-center'>
        <img src={Login} alt="book" />
      </div>
      <Container maxWidth="sm" className="mt-8 p-4 bg-white shadow-md rounded">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={onSubmit} noValidate className='flex gap-7 flex-col'>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="mt-4 cursor-pointer"
            sx={{ background: "#1F2937", "&.MuiButtonBase-root:hover": { background: "#1F2937" } }}
          >
            Login
          </Button>
        </form>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default LoginPage;
