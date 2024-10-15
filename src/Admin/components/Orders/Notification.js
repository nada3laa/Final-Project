import React from 'react';
import { Snackbar } from '@mui/material';

const Notification = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      message={message}
    />
  );
};

export default Notification;
