import { useEffect, useState } from 'react';
import { ApiService, IUser } from '../../../Services/api';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import SnackbarComponent from "../../../UI/Table/Alerts/alert";
interface EditUserFormProps {
  open: boolean;
  user: IUser;
  onClose: () => void;
  onSubmit: (user: IUser) => void;
}

const EditUserForm = ({ open, user, onClose }: EditUserFormProps) => {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [openSnackbar,setOpenSnackbar]=useState(false);
  const [ Users, setUsers] = useState<IUser>()
  const apiService = new ApiService()
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await apiService.getUsers();
      setUsers(data);
    };

    fetchUsers();
  },);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUser: IUser = { ...user, name, email, phone, username };
    await apiService.updateUser(user.id, updatedUser);
    const data = await apiService.getUsers();
      setUsers(data);
    alert('user modified successfully')
    setOpenSnackbar(true)
    onClose()
  };
  const handleCloseSnackbar=()=>{
    setOpenSnackbar(false)
}

  return (
    <>
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            inputProps={{ pattern: "[A-Za-z]{1,32}" }}
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Username"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            // inputProps={{ pattern: "" }}
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            inputProps={{ pattern: "[0-9]{10}" }}
            margin="dense"
            id="phone"
            label="Phone Number" 
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" color="primary">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
    <SnackbarComponent open={openSnackbar} onClose={handleCloseSnackbar} message={'User edited successfully!!'}></SnackbarComponent>
    </>
  );
};

export default EditUserForm;