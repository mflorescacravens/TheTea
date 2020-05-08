import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'; 


const useStyles = makeStyles(theme => ({
    appBarRoot: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    barButtons: {
        marginRight: theme.spacing(2),
    }
}));
  
export default function NavBar() {
  const classes = useStyles();

  return(
    <AppBar position="static" className={classes.appBarRoot}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
        The Tea
        </Typography>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/profile">
          <Button color="inherit" variant='outlined' className={classes.barButtons}>Profile</Button>
        </Link>
        {/* <Link to="/login">
          <Button color="inherit" variant='outlined' className={classes.barButtons}>Login</Button>
        </Link> */}
        <Link to="/newPost">
          <Button color="inherit" variant='outlined' className={classes.barButtons}>New Post</Button>
        </Link>
        <Link to="/settings">
          <Button color="inherit" variant='outlined' className={classes.barButtons}>Settings</Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}