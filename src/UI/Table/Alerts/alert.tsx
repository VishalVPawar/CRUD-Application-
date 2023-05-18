import React from 'react'
import {Snackbar} from "@material-ui/core";
import Alert from '@mui/material/Alert';

interface Props{
    open: boolean,
    message: string,
    onClose: () => void
}

const SnackbarComponent:React.FC<Props>=({open,onClose,message})=>{
    return(
        <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
            <Alert severity="success">{message}</Alert>
        </Snackbar>
    )
}

export default SnackbarComponent