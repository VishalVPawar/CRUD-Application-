import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiService, IUser } from '../../Services/api';
const initialValue = {
    id:0,
    name: '',
    username: '',
    email: '',
    phone: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;


const UserEdit = () => {
    const [user, setUser] = useState(initialValue);
    const { name, username, email, phone } = user;
    const id:any= useParams();
    
    let navigate = useNavigate();

    useEffect(() => {
        loadUserDetails();
    },);
    const apiService = new ApiService();
    const loadUserDetails = async() => {
        const response:any = await apiService.getUsers();
        setUser(response.data);
    }
    const editUserDetails = async(id:number,user:IUser) => {
     
        navigate('/user');
    }
    const onValueChange = (e:any) => {
        console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value})
    }
    return (
        <Container>
            <Typography variant="h4">Edit Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Username</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='username' value={username} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phone' value={phone} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editUserDetails(id,user)}>Edit User</Button>
            </FormControl>
        </Container>
    )
}

export default UserEdit;

