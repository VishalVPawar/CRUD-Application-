import React from "react";
import Typography from "@mui/material/Typography";
import Navbar from "../../Shared/Layout/Header";

const NotPageFound = () => {
  return (
    <>
      <Navbar
        isLoggedIn={false}
        onLogout={function (): void {
          throw new Error("Function not implemented.");
        }}
      ></Navbar>
      <div>
        <Typography variant="h3" color={"#19ACD1"} marginTop="200px">
          Welcome in CRUD Application
        </Typography>
      </div>
    </>
  );
};
export default NotPageFound;
