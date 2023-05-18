import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../../Shared/Layout/Header";
import './About.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
    },
    title: {
        marginBottom: theme.spacing(4),
    },
}));
const HomePage = () => {
    const classes = useStyles();
    return (<>
        <Navbar isLoggedIn={false} onLogout={function (): void {
            throw new Error('Function not implemented.');
          } }></Navbar>
    
    <div className={classes.root}  style={{margin:'100px'}}>
    
        <Typography variant="h4" align="center" className={classes.title}>
        One size doesn’t fit all, so our approach shouldn’t either.</Typography>
        <Typography className="d2" variant="h5" align="center" >
        We invest the time to learn about your business – from the inside out.</Typography>
        <br />
        <Typography variant="h6" align="center">
        We want to understand your pain points, your unique needs and your key objectives. Then we work diligently to customize a solution that fits what you need today, and will take you to where your business will thrive tomorrow.</Typography>
            </div>
            </>
    );
};
export default HomePage;