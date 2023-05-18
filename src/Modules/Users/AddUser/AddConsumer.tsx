import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { IUser } from '../../../Services/api';
import SnackbarComponent from "../../../UI/Table/Alerts/alert";


type AddUserProps = {
  handleAddUser: (user: IUser) => void;
};


const AddUser: React.FC<AddUserProps> = ({ handleAddUser }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<IUser>({ name: "", username: "", email: "", phone: "", id:0});
  const [openSnackbar,setOpenSnackbar]=useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddUser(user);
    setUser({ name: "", username: "", email: "", phone: "" ,id:0});
    setOpenSnackbar(true)
    handleClose();
  };
const handleCloseSnackbar=()=>{
    setOpenSnackbar(false)
}
  return (
    <div>
      <Button variant="contained" color="primary" disableElevation sx={{marginLeft: '1143px', height:'40px'}} onClick={handleClickOpen}>
        Add Consumer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Consumer</DialogTitle>
        <DialogContent>
         
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              inputProps={{ pattern: "[A-Za-z]{1,32}" }}
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              fullWidth
              required={true}
            />
            <TextField
              margin="dense"
              label="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              fullWidth
              required={true}
              type="email"
            />
            <TextField
              margin="dense"
              label="Phone"
              id="mobile"
              inputProps={{ pattern: "[2-9]{10}" }}
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              fullWidth
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add Consumer</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <SnackbarComponent open={openSnackbar} onClose={handleCloseSnackbar} message={'Consumer added successfully!!'}></SnackbarComponent>
    </div>
  );
};

export default AddUser;