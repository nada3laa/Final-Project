import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Paper, Button } from '@mui/material';
import Sidebar from '../Sidebar'; // Import Sidebar

const CustomerShow = () => {
  const { id } = useParams(); // Get the customer ID from the URL parameters
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = `http://localhost:3001/members/${id}`;

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(apiUrl);
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [apiUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!customer) {
    return <div>Customer not found.</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '300px', height: '100vh', flexShrink: 0, backgroundColor: '#ffe0e0' }}>
        <Sidebar />
      </div>
      <Container sx={{ flexGrow: 1, padding: '20px' }}>
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
          <Typography variant="h4" gutterBottom>
            Customer Details
          </Typography>
          <Typography variant="h6">Username: {customer.username}</Typography>
          <Typography variant="h6">Email: {customer.email}</Typography>
          <Typography variant="h6">Phone: {customer.phone}</Typography>
          <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={() => window.history.back()}>
            Back
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default CustomerShow;
