import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { adminLoginRequest } from '../redux/admin/adminActions';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, error, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    if (token) {
      navigate('/admin');
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLoginRequest({ email, password }));
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" mb={2}>Admin Login</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
          disabled={loading}
        />
        <TextField
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          type="password"
          required
          disabled={loading}
        />
        {error && <Typography color="error" mt={1}>{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Box>
    </Container>
  );
}
