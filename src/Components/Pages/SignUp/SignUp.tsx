import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button, Snackbar } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SignUp.css";
import { Typography, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    field: { marginBottom: theme.spacing(5), width: "100%", height: "40px" },
    button: {
      marginTop: theme.spacing(0),
      color: "white",
      background: "#0377fcce",
      width: "100%",
      height: "40px",
    },
    error: { color: theme.palette.error.main },
  })
);

interface SignUpValues {
  email: string;
  password: string;
}
const SignUpFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
    .matches(/[.]/, "email must be have one . Dot")
    .matches(/[@]/, "email must be have one @")
    .max(80, "Too Long!"),

  password: Yup.string()
    .required("Required")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/\d/, "Password must contain at least one number.")
    .matches(
      /[@$!%*#?&]/,
      "Password must contain at least one special character."
    )
    .min(8, "Password must be at least 8 characters long.")
    .max(16, "Password is Too Long!"),

  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
const SignUpForm: React.FC = () => {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [openWarningSnackbar, setOpenWarningSnackbar] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

  const handleCloseSuccessSnackbar = () => {
    setOpenSuccessSnackbar(false);
  };

  const classes = useStyles();
  const navigate = useNavigate();
  const navigateTo = (url: string) => {
    navigate(url);
  };
  interface User {
    email: string;
    password: string;
  }
  const handleSubmit = async (values: SignUpValues) => {
    const response = await fetch(
      `http://localhost:3000/login?email=${values.email}`
    );
    const users: User[] = await response.json();
    if (users.length > 0) {
      setOpenWarningSnackbar(true);
      return;
    }
    const postResponse = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (postResponse.ok) {
      setOpenSuccessSnackbar(true);
      setTimeout(() => {
        navigateTo("/");
      }, 2000);
    } else {
      const data = await response.json();
      const error =
        data.error || "Something went wrong. Please try again later.";
      alert(error);
    }
  };

  const handleCloseWarnSnackbar = () => {
    setOpenWarningSnackbar(false);
  };
  return (
    <div className={classes.root}>
      <div className="login-wrp">
        <div className="block left">
          <div className="promo-box">
            <h1 className="heading">Welcome in CRUD Application</h1>

            <div className="promo-sub-title">
              <h3 className="heading">
                Do what you can, with what you have, where you are.
              </h3>
            </div>
          </div>
        </div>
        <div className="block right">
          <div className="login">
            <div className="login-form">
              <Formik
                initialValues={initialValues}
                validationSchema={SignUpFormSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form className={classes.form}>
                    <div className="form-fild">
                      <Typography marginBottom={"10px"}>
                        Registration Form
                      </Typography>
                      <Field
                        className={classes.field}
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
                    </div>
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
                    <div className="form-fild">
                      <Field
                        className={classes.field}
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        as={TextField}
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
                        }
                        helperText={<ErrorMessage name="confirmPassword" />}
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
                    <div className="btn-wrp">
                      <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>

              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openSuccessSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSuccessSnackbar}
              >
                <Alert
                  style={{ backgroundColor: "green", color: "black" }}
                  onClose={handleCloseSuccessSnackbar}
                  severity="success"
                >
                  Registered successfully!
                </Alert>
              </Snackbar>
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openWarningSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSuccessSnackbar}
              >
                <Alert
                  style={{ backgroundColor: "yellowgreen", color: "black" }}
                  onClose={handleCloseWarnSnackbar}
                  severity="warning"
                >
                  This Email Already registered. please register with different
                  email
                </Alert>
              </Snackbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpForm;
