import React, {useState, useEffect} from 'react';
import './App.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
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
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [weather, setWeather] = useState(false);

  var weatherMapped = 'nothing yet...';
  
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  var date;


  const weatherCall = () => {
    const data = null;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        setWeather(JSON.parse(this.responseText));
      }
      
    });

    xhr.open("GET", "https://api.climacell.co/v3/weather/realtime?lat=47.6062&lon=122.3321&unit_system=us&fields=precipitation%2Ctemp&apikey=" + process.env.REACT_APP_API_KEY);

    xhr.send(data);


  }

  useEffect(() => {
    weatherCall();
  }, [])


  // {"lat":47.6062,"lon":122.3321,"temp":{"value":46.29,"units":"F"},"precipitation":{"value":0,"units":"in/hr"},"observation_time":{"value":"2020-09-22T22:58:00.048Z"}}
  if (typeof weather === "object") {
    weatherMapped = <p>Temp: {weather.temp.value} F°</p>
    date = Date.parse(weather.observation_time.value)
  }
  
  return(
    <AppBar position="static" className={classes.appBarRoot}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon 
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          />
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <Link to="/" onClick={handleClose} className="links">
                        <MenuItem>Home</MenuItem>
                      </Link>
                      <Link to='/profile' onClick={handleClose} className="links">
                        <MenuItem>Profile</MenuItem>
                      </Link>
                      <Link to='/newPost' onClick={handleClose} className="links">
                        <MenuItem>New Post</MenuItem>
                      </Link>
                      <Link to="/settings" className="links">
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                      </Link>
                      <Link to='/logout' className="links">
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </Link>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
        <Link to='/' className="links home">The Tea</Link>
        {weatherMapped}
        {/* <button onClick={printWeather}>hey</button> */}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}