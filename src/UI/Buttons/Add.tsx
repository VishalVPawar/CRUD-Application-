import React from 'react'
import {Button} from '@mui/material'
import { NavLink } from 'react-router-dom';
const Add = () => {
  return (
    <div>
        <NavLink to={'/adduser'}>
                <Button variant="contained" color="success" >Add user</Button>
            </NavLink>
    </div>
  )
}

export default Add