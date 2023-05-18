import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button, Snackbar } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { Typography, InputAdornment } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      marginBottom: theme.spacing(5),
      width: "100%",
      height: "40px",
    },
    button: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(3),
      width: "100%",
      height: "40px",
      color: "white",
      background: "#0377fcce",
    },
    error: {
      color: theme.palette.error.main,
    },
  })
);

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginFormSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

  interface User {
    email: string;
    password: string;
  }
  const notify = (text:string) => toast(text);
  const handleLogin = async (values: LoginFormValues) => {
    const response = await fetch("http://localhost:3000/login", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const users: User[] = await response.json();
    const foundUser = users.find((u) => u.email === values.email);
    if (foundUser) {
      if (foundUser.password === values.password) {
        setOpenSuccessSnackbar(true);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        setOpenErrorSnackbar(true);
        setErrorSnackbarMessage("Enter valid Email or Password");
      }
    } else {
      setTimeout(() => {
        navigate("/signup");
      }, 5000);
      notify("User not found. Please register first.")
    }
  };
  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  };
  const handleCloseSuccessSnackbar = () => {
    setOpenSuccessSnackbar(false);
  };

  return (
    <>
      <div>
        <div className="login-wrp">
          <div className="blockleft">
            <div className="promo-box">
              <h1 className="heading1">Welcome in CRUD Application</h1>
              <div className="promo-sub-title">
                <h3 className="heading2">
                  Do what you can, with what you have, where you are.
                </h3>
              </div>
            </div>
          </div>
          <div className="block right">
            <div className="login">
              <div className="login-form">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={LoginFormSchema}
                  onSubmit={handleLogin}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Typography marginBottom={"20px"}> Login </Typography>
                      <Field
                        className={classes.field}
                        type="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        as={TextField}
                        error={touched.email && Boolean(errors.email)}
                        helperText={<ErrorMessage name="email" />}
                        InputProps={{
                          style: { height: "45px" },
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ height: "20px" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <div className="form-fild">
                        <Field
                          className={classes.field}
                          name="password"
                          label="Password"
                          variant="outlined"
                          type="password"
                          as={TextField}
                          error={touched.password && Boolean(errors.password)}
                          helperText={<ErrorMessage name="password" />}
                          InputProps={{
                            style: { height: "45px" },
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon sx={{ height: "20px" }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                      <div className="form-fild"></div>
                      <div className="btn-wrp">
                        <Button
                          className={classes.button}
                          type="submit"
                          variant="contained"
                        >
                          Login
                        </Button>
                      </div>
                      <Typography>
                        Not a registered user
                        <NavLink to={"/signup"}> Register here </NavLink>
                      </Typography>
                    </Form>
                  )}
                </Formik>
                <Snackbar
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  open={openErrorSnackbar}
                  autoHideDuration={6000}
                  onClose={handleCloseErrorSnackbar}
                >
                  <Alert
                    style={{ backgroundColor: "red", color: "black" }}
                    onClose={handleCloseErrorSnackbar}
                    severity="error"
                  >
                    {errorSnackbarMessage}
                  </Alert>
                </Snackbar>

                <Snackbar
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  open={openSuccessSnackbar}
                  autoHideDuration={2000}
                  onClose={handleCloseSuccessSnackbar}
                >
                  <Alert
                    onClose={handleCloseSuccessSnackbar}
                    severity="success"
                  >
                    Logged in successfully!
                  </Alert>
                </Snackbar>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
