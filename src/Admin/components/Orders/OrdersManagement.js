import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Box, Paper, Snackbar, Alert } from '@mui/material';
import OrdersTable from './OrdersTable'; // Ensure this exists
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';

const OrdersManagement = () => {
  const [members, setMembers] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('info');

  // API endpoint
  const apiUrl = 'http://localhost:3004/data';

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(apiUrl);
      console.log(response.data); // Log to inspect the structure of the data
      const membersData = response.data.map((customer, index) => ({
        id: customer.id,
        username: customer.customer.name,
        email: customer.customer.email,
        products: customer.products,
        total: customer.total,
      }));
      setMembers(membersData);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setNotificationMessage('Error fetching customer data');
      setNotificationSeverity('error');
      setOpenNotification(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`); // Update this endpoint if needed
      setNotificationMessage('Customer deleted successfully');
      setNotificationSeverity('success');
      setOpenNotification(true);
      fetchMembers(); // Refresh the member list
    } catch (error) {
      console.error("Error deleting customer:", error);
      setNotificationMessage('Error deleting customer');
      setNotificationSeverity('error');
      setOpenNotification(true);
    }
  };

  const handleAddMember = () => {
    setNotificationMessage('Customer added successfully');
    setNotificationSeverity('success');
    setOpenNotification(true);
  };

  const handleEditMember = () => {
    setNotificationMessage('Customer updated successfully');
    setNotificationSeverity('success');
    setOpenNotification(true);
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f7f7f7' }}>
      <div style={{ width: '300px', height: '100vh', flexShrink: 0, backgroundColor: '#ffe0e0' }}>
        <Sidebar />
      </div>
      <Container sx={{ flexGrow: 1, padding: { xs: '10px', md: '20px' } }}>
        <Typography variant="h4" gutterBottom>
          Orders Management
        </Typography>
      
        
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
          <OrdersTable members={members} onDelete={handleDelete} onEdit={handleEditMember} />
        </Paper>

        <Snackbar
          open={openNotification}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseNotification} severity={notificationSeverity}>
            {notificationMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default OrdersManagement;
