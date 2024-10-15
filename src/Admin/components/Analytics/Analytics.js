import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../Sidebar';
import CustomerReview from '../CustomerReview/CustomerReview';

const Analytics = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f7f7f7' }}>
      {/* Sidebar with fixed width */}
      <Box sx={{ width: '300px', backgroundColor: '#ffe0e0', flexShrink: 0, height: '100vh' }}>
        <Sidebar />
      </Box>

      {/* Main content area for the CustomerReview component */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: '1200px', padding: '20px' }}>
          <CustomerReview />
        </Box>
      </Box>
    </Box>
  );
};

export default Analytics;
