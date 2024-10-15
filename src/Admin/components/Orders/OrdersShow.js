import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Paper, Button, Box, Divider, Grid } from '@mui/material';
import Sidebar from '../Sidebar'; // Import Sidebar

const OrdersShow = () => {
  const { id } = useParams(); // Get the customer ID from the URL parameters
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For navigation (e.g., back button)

  const apiUrl = `http://localhost:3004/data/${id}`; // Adjusted API endpoint

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(apiUrl);
        setCustomer(response.data); // Set the customer data
      } catch (error) {
        console.error('Error fetching customer:', error);
      } finally {
        setLoading(false); // Turn off loading
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
    <Box display="flex" height="100vh" bgcolor="#f4f6f8">
      {/* Sidebar */}
      <Box width="300px" bgcolor="#ffe0e0" flexShrink={0}>
        <Sidebar />
      </Box>

      {/* Main content */}
      <Container sx={{ flexGrow: 1, py: 4 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: '15px' }}>
          {/* Customer Information */}
          <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
            Customer Details
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Username:</Typography>
              <Typography variant="body1">{customer.customer.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Email:</Typography>
              <Typography variant="body1">{customer.customer.email}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Phone:</Typography>
              <Typography variant="body1">{customer.customer.phone}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Total Purchase:</Typography>
              <Typography variant="body1">${customer.total}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Product Information */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Purchased Products
          </Typography>

          {customer.products && customer.products.length > 0 ? (
            customer.products.map((product, index) => (
              <Box key={index} display="flex" justifyContent="space-between" mb={2} px={1}>
                <Typography variant="body1">
                  {product.name} - {product.quantity} pcs
                </Typography>
                <Typography variant="body1">
                  ${product.price} each
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body1">No products available.</Typography>
          )}

          <Divider sx={{ my: 4 }} />

          {/* Back Button */}
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                backgroundColor: '#007bff',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
              }}
              onClick={() => navigate(-1)} // Go back to the previous page
            >
              Back
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default OrdersShow;
