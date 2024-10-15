import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  IconButton,
  Snackbar,
  Button,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const OrdersTable = ({ members, onDelete }) => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);

  const handleShow = (id) => {
    navigate(`/orders-show/${id}`); // Navigate to CustomerShow with the customer ID
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenSnackbar(true);
  };

  const confirmDelete = async () => {
    await onDelete(deleteId);
    setDeleteId(null);
    setOpenSnackbar(false);
  };

  const handleEdit = (member) => {
    navigate(`/edit-orders/${member.id}`, { state: { member } }); // Navigate to edit form
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel>Username</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Email</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Products</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>Total</TableSortLabel>
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.username}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  {member.products.map((product, index) => (
                    <div key={index}>
                      {product.name || product.products.map(p => p.name).join(", ")}
                    </div>
                  ))}
                </TableCell>
                <TableCell>{member.total}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleShow(member.id)}>
                    <VisibilityIcon color="primary" />
                  </IconButton>
                 
                  <IconButton onClick={() => handleDelete(member.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Are you sure you want to delete this member?"
        action={
          <>
            <Button color="inherit" onClick={confirmDelete}>
              Yes
            </Button>
            <Button color="inherit" onClick={() => setOpenSnackbar(false)}>
              No
            </Button>
          </>
        }
      />
    </>
  );
};

export default OrdersTable;
