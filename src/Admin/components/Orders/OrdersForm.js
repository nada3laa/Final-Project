import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar'; // Adjust the import path if necessary
import { Typography, TextField, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import Notification from './Notification'; // Import Notification component
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation for redirection and data handling

const OrdersForm = () => {
  const location = useLocation(); // For getting passed state
  const navigate = useNavigate(); // Initialize useNavigate

  const [customerData, setCustomerData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '', // Include password in the state
  });
  
  const [isEditMode, setIsEditMode] = useState(false); // Track if editing mode
  const [existingEmails, setExistingEmails] = useState([]); // State to hold existing emails
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    // Fetch existing emails when component mounts
    const fetchEmails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/members');
        setExistingEmails(response.data.map(member => member.email)); // Store emails in state
      } catch (error) {
        console.error('Error fetching existing emails:', error);
      }
    };

    fetchEmails();

    // Check if we are in edit mode
    if (location.state && location.state.member) {
      setIsEditMode(true); // Set edit mode
      setCustomerData(location.state.member); // Prefill form with customer data
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email is unique only for new customers
    if (!isEditMode && existingEmails.includes(customerData.email)) {
      setNotificationMessage('Email already exists. Please use a different email.');
      setOpenNotification(true);
      return; // Prevent submission if email is not unique
    }

    try {
      if (isEditMode) {
        // Send a PUT request to update the customer data
        await axios.put(`http://localhost:3001/members/${customerData.id}`, customerData);
        setNotificationMessage('Customer updated successfully!');
      } else {
        // Send data to the API, including the password (for new customers)
        await axios.post('http://localhost:3001/members', customerData);
        setNotificationMessage('Customer added successfully!');
      }

      setOpenNotification(true);

      // Clear the form after submission if adding a new customer
      if (!isEditMode) {
        setCustomerData({
          username: '',
          email: '',
          phone: '',
          password: '',
        });
      }

      // Redirect to CustomerManagement page after a short delay
      setTimeout(() => {
        navigate('/CustomerManagement'); // Navigate to CustomerManagement
      }, 1500);

    } catch (error) {
      console.error("There was an error processing the customer:", error);
      setNotificationMessage('Error processing customer. Please try again.');
      setOpenNotification(true);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '300px', height: '100vh', flexShrink: 0, backgroundColor: '#ffe0e0' }}> {/* Sidebar color and full height */}
        <Sidebar />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', width: '100%', maxWidth: '900px' }}>
          <Typography variant="h4" gutterBottom align="center">
            {isEditMode ? 'Edit Customer' : 'Add New Customer'}
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
              {!isEditMode && (
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    name="password"
                    value={customerData.password}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  {isEditMode ? 'Update Customer' : 'Submit'}
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

export default OrdersForm;
