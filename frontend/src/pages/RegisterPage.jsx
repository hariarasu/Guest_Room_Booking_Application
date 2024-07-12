import React, { useContext, useState } from 'react';
import { TextField, Button, Container, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../services/api';
import { Signup } from '../Assest/assest';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setAuth, setRole, setId } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    role: 'user', // default role
  });

  const { name, email, password, confirmPassword, mobile, role } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const validateForm = () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const data = await register(formData);
      console.log(data.data);
      localStorage.setItem('token', data.data.token);
      localStorage.setItem("role", data.data.role);
      localStorage.setItem("id", data.data.id);
      setAuth(true);
      setRole(data.data.role);
      setId(data.data.id);
      navigate('/home')
      toast.success('Registration successful!');
    } catch (error) {
      console.error(error);
      toast.error('Registration failed!');
    }
  };

  return (
    <div className='flex justify-center h-screen items-center'>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={onSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            variant="outlined"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
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
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            variant="outlined"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mobile"
            variant="outlined"
            name="mobile"
            value={mobile}
            onChange={onChange}
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={role}
              onChange={onRoleChange}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="owner">Owner</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="mt-4 cursor-pointer"
            sx={{
              background: "#1F2937", "&.MuiButtonBase-root:hover": {
                background: "#1F2937"
              }
            }}
          >
            Register
          </Button>
        </form>
        <ToastContainer />
      </Container>
      <div className='w-[50%] h-[70%] flex justify-center'>
        <img src={Signup} alt="book" />
      </div>
    </div>
  );
};

export default RegisterPage;
