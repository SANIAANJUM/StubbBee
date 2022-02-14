import React, {useEffect} from 'react';
import {AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem,  ListItemText, Toolbar, Typography, Container} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios'
import BuyProduction from './BuyProduction'
import InTransit from './InTransit'
import Productions from './Productions'
import Profile from './Profile'
import TransportOrders from './TransportOrders'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function BuyerHome(props) {
  const [screen, setScreen] = React.useState(0)
  const [email, setEmail] = React.useState('');
  const [first_name, setFirstName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    axios.get('http://127.0.0.1:8000/backend/userdata/',
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
      },
    }
    )
      .then(res => {
        setEmail(res.data.email)
        setFirstName(res.data.first_name)
        setLastName(res.data.last_name)
      })
      .catch(err => {
        console.log(err)
      })
  });
  const handleLogout = (event) => {
    const token = JSON.parse(localStorage.getItem("token"))
    event.preventDefault();
    const data = {}
    axios.post('http://127.0.0.1:8000/rest-auth/logout/', data,
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
      },
    }
    )
      .then(res => {
        console.log(res)
        window.location.href='/'
      })
      .catch(err => {
        console.log(err)
      })
    localStorage.setItem("loggedIn",JSON.stringify(false));
    localStorage.setItem("token",'')
    window.location.href='/'
  }
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Container>
      <br />
      <Typography>{first_name+" "+last_name}</Typography>
      <br />
      <Typography>{email}</Typography>
      </Container>
      <Divider />
      <List>
        <ListItem button onClick={()=>{setScreen(0)}}><ListItemText primary="Buy Productions" /></ListItem>
        <ListItem button onClick={()=>{setScreen(1)}}><ListItemText primary="Productions" /></ListItem>
        <ListItem button onClick={()=>{setScreen(2)}}><ListItemText primary="Transport Orders" /></ListItem>
        <ListItem button onClick={()=>{setScreen(3)}}><ListItemText primary="In Transit" /></ListItem>
        <ListItem button onClick={()=>{setScreen(4)}}><ListItemText primary="Profile" /></ListItem>
        <ListItem button style={{color:'red'}} onClick={handleLogout}><ListItemText primary="Sign Out" /></ListItem>
        
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? window.document.body : undefined;
  let Page;
  if(screen === 0){Page = <BuyProduction></BuyProduction>}
  else if(screen === 1){Page = <Productions></Productions>}
  else if(screen === 2){Page = <TransportOrders></TransportOrders>}
  else if(screen === 3){Page = <InTransit></InTransit>}
  else{Page = <Profile></Profile>}

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap >
            BUYER
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
          {Page}
      </main>
    </div>
  );
}

export default BuyerHome;
