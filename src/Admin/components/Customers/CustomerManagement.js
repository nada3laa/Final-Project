import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Box, Paper, Snackbar, Alert } from '@mui/material';
import CustomerTable from './CustomerTable'; // Ensure this exists
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';

const CustomerManagement = () => {
  const [members, setMembers] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('info'); // Add severity state

  const apiUrl = 'http://localhost:3001/members';

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const response = await axios.get(apiUrl);
    setMembers(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    setNotificationMessage('Member deleted successfully');
    setNotificationSeverity('success'); // Set severity to success
    setOpenNotification(true);
    fetchMembers();
  };

  const handleAddMember = () => {
    setNotificationMessage('Member added successfully');
    setNotificationSeverity('success');
    setOpenNotification(true);
  };

  const handleEditMember = () => {
    setNotificationMessage('Member updated successfully');
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
          Customer Management
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/customer-form" 
          sx={{ marginBottom: '20px' }}
          onClick={handleAddMember} // Trigger notification on add
        >
          Add New Customer
        </Button>
        
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
          <CustomerTable members={members} onDelete={handleDelete} onEdit={handleEditMember} />
        </Paper>

        <Snackbar
          open={openNotification}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at the top center
        >
          <Alert onClose={handleCloseNotification} severity={notificationSeverity}>
            {notificationMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default CustomerManagement;
