import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <div>
        <div className={classes.root}style={{marginBottom:'20px'}}>
          <Typography style={{color:'black',font:'message-box'}} variant="body2" align="center" >
            Copyright &copy; 2023 User Management Portal. All rights reserved.
          </Typography>
        </div>
        </div>
  );
};
export default Footer;