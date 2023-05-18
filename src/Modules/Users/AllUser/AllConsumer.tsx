import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { ApiService, IUser } from '../../../Services/api';
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Toolbar, Typography } from '@material-ui/core';
import AddUsers from '../AddUser/AddConsumer';
import Navbar from '../../../Components/Shared/Layout/Header';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditUserForm from '../EditUser/EditUser';

// interface Props{
//   user:IUser[];
//   onDelete:()=>void;
// }
  const AllUsers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<IUser[]>([]);
  const [editUser, setEditUser] = useState<IUser | null>(null);
  const [openEditUserForm, setOpenEditUserForm] = useState(false);

  const handleEdit = (user: IUser) => {
    setEditUser(user);
    setOpenEditUserForm(true);
  };

  const handleEditUserFormClose = () => {
    setOpenEditUserForm(false);
  };
  const handleEditUserSubmit = async (editedUser: IUser) => {
    try {
      const updatedUser = await apiService.updateUser(editedUser.id, editedUser);
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setOpenEditUserForm(false); 
    } catch (error) {
      console.log(error);

    }
  };

  const apiService = new ApiService();
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await apiService.getUsers();
      setUsers(data);
      setIsLoading(false);
    };

    fetchUsers();
  },);
  const addUserDetails = async (user: IUser) => {
    await apiService.createUser(user)
    const data = await apiService.getUsers();
    setUsers(data);
  };
  const deleteUserDetails = async (id: number) => {
    const confirm = window.confirm(`Are you sure you want to delete user with id: ${id}`)
    if (confirm) {
      await apiService.deleteUser(id)
      const data = await apiService.getUsers();
      setUsers(data);
    }
  }
  if (isLoading) {
    return <Typography>Loading<CircularProgress /></Typography>;
  }
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID',headerClassName: 'super-app-theme--header',align:'center',
    headerAlign:'center', width: 100},
    { field: 'name', headerName: 'Name',headerClassName: 'super-app-theme--header',align:'center',
    headerAlign:'center', width: 250 },
    { field: 'username', headerName: 'Username',headerClassName: 'super-app-theme--header',align:'center',
    headerAlign:'center', width: 220 },
    { field: 'email', headerName: 'Email', headerClassName: 'super-app-theme--header',align:'center',
    headerAlign:'center',width: 230 },
    { field: 'phone', headerName: 'Phone',headerClassName: 'super-app-theme--header',align:'center',
    headerAlign:'center',width: 180 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      align:'center',
      headerAlign:'center',
      filterable:false,
      headerClassName: 'super-app-theme--header',
      width: 250,
      renderCell: ({row}) => (
        <>
          <IconButton aria-label="edit"onClick={()=>handleEdit(row)} color='primary'>
            <EditIcon></EditIcon> 
          </IconButton>
          <IconButton aria-label="delete" onClick={()=>deleteUserDetails(row.id) }  color='error'>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  

  return (
    <>

<Navbar isLoggedIn={false} onLogout={function (): void {
          throw new Error('Function not implemented.');
        } }></Navbar>
    <div style={{ height: 500, width: '100%' }}>
      
      <Toolbar><AddUsers handleAddUser={addUserDetails} ></AddUsers></Toolbar>
      <DataGrid sx={{
        marginLeft:3,
        marginRight:9,
    boxShadow: 1,
    
    borderColor: 'gray',
    '& .MuiDataGrid-cell:hover': {
      color: 'primary',},
      '& .super-app-theme--header': {
        backgroundColor: 'rgb(255, 255, 255)',
      fontFamily:"inherit",
    fontSize:'16px'}
    
  }} rows={users} columns={columns} />
   {openEditUserForm && (
          <EditUserForm
            open={openEditUserForm}
            user={editUser!}
            onClose={handleEditUserFormClose}
            onSubmit={handleEditUserSubmit}
          />
        )}
    </div>
    </>
  );
};

export default AllUsers;
