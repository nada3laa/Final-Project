import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar'; // Adjust the import path if necessary
import { Typography, TextField, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import Notification from './Notification'; // Import Notification component
import { useNavigate, useLocation } from 'react-router-dom'; // For redirection and location state

const EditCustomerForm = () => {
  const location = useLocation(); // For getting passed state
  const navigate = useNavigate(); // Initialize useNavigate

  // Initial state for customer data
  const [customerData, setCustomerData] = useState({
    username: '',
    email: '',
    phone: '',
  });
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    // Check if we have customer data passed from the table
    if (location.state && location.state.member) {
      setCustomerData(location.state.member); // Set the form data with the member's info
    } else {
      // If no data is passed, redirect to customer management page
      navigate('/CustomerManagement');
    }
  }, [location.state, navigate]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  // Handle form submission for updating the customer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update the customer data
      await axios.put(`http://localhost:3001/members/${customerData.id}`, customerData);
      setNotificationMessage('Customer updated successfully!');
      setOpenNotification(true);

      // Redirect to CustomerManagement page after a short delay
      setTimeout(() => {
        navigate('/CustomerManagement');
      }, 1500);
    } catch (error) {
      console.error("There was an error processing the customer:", error);
      setNotificationMessage('Error processing customer. Please try again.');
      setOpenNotification(true);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '300px', height: '100vh', flexShrink: 0, backgroundColor: '#ffe0e0' }}>
        <Sidebar />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', width: '100%', maxWidth: '900px' }}>
          <Typography variant="h4" gutterBottom align="center">
            Edit Customer
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Customer Name"
                  variant="outlined"
                  fullWidth
                  name="username"
                  value={customerData.username}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  name="email"
                  value={customerData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  type="tel"
                  name="phone"
                  value={customerData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Update Customer
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" color="secondary" onClick={() => navigate('/CustomerManagement')} fullWidth>
                  Back
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Notification
          open={openNotification}
          message={notificationMessage}
          onClose={() => setOpenNotification(false)}
        />
      </div>
    </div>
  );
};

export default EditCustomerForm;
