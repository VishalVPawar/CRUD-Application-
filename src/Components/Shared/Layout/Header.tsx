import React, { useState } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { Link} from "react-router-dom";
import { logout } from "../../../Services/Auth";
import { userInfo } from "os";
interface Props {
  isLoggedIn: boolean;
  onLogout: () => void;
  
}

// const user=JSON.parse(localStorage.getItem())
// const History =unstable_HistoryRouter;

// function LogOut(){
//   localStorage.clear();
//   History.('/')
// }

const clearCacheData = () => {
  caches.keys().then((names) => {
    names.forEach((name) => {
      caches.delete(name);
    });
  })};

const Navbar = ({ isLoggedIn, onLogout }: Props) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
//  const [loggedIn, setLoggedIn] =useState(localStorage.access ? true : false);

  return (
    <AppBar
      position="static"
      style={{
        background: "linear-gradient(to right, #ffffff 0%, #e6e3e3 100%)",
      }}
    >
      <Tabs value={value} onChange={handleChange}>
        <Tab
          style={{ fontFamily: "inherit", color: "black", fontSize: "15px" }}
          label="Home"
          component={Link}
          to="/about"
        />
        <Tab
          style={{ fontFamily: "inherit", color: "black", fontSize: "15px" }}
          label="Consumer"
          component={Link}
          to="/User"
        />
        {/* {isLoggedIn ? (
          <Tab label="Logout" onClick={handleLogout} />
        ) : ( */}
          <Tab
            style={{ fontFamily: "inherit", color: "black", fontSize: "15px" }}
            label="About"
            component={Link}
            to="/login"
          />
        {/* )} */}
        {isLoggedIn && (
          <Tab
            style={{ fontFamily: "inherit", color: "black", fontSize: "15px" }}
            label="User"
            component={Link}
            to="/user"
          />
        )}
        <Tab
          style={{ fontFamily: "inherit", color: "black", fontSize: "15px" }}
          label="LogOut"
          onClick= {() => {
           
          }}
          component={Link}
          to="/"
        />
      </Tabs>
    </AppBar>
  );
};
export default Navbar;
