import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@mui/material'
import { ApiService, IUser } from '../../../Services/api';

type DeleteUserProps = {
  user: IUser;
  onDeleteSuccess: () => void;
};

const DeleteUser: React.FC<DeleteUserProps> = ({ user, onDeleteSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleDeleteClick = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };
  const apiService = new ApiService();
  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await apiService.deleteUser(user.id);
      setIsDeleting(false);
      onDeleteSuccess();
      setSnackbarMessage('User deleted successfully.');
    } catch (error) {
      setIsDeleting(false);
      console.error(error);
      setSnackbarMessage('Failed to delete user.');
    }
    setIsOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarMessage('');
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={handleDeleteClick}>
        Delete
      </Button>
      <Dialog open={isOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={isDeleting} onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button
            disabled={isDeleting}
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
};
export default DeleteUser;