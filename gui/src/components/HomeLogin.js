import React from 'react';
import logo from '../static/logo.png'
import {CssBaseline, Container, TextField, Typography, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Button, Paper, Link} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import BuyerHome from './buyer/BuyerHome'
import SellerHome from './seller/SellerHome'
import TransporterHome from './transporter/TransporterHome'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  Container: {
    padding: theme.spacing(1),
    margin : theme.spacing(1),
    // height : 20,
    // width : 20,
    display : 'flex',
    flexWrap : 'wrap',
  },
  Paper:{
    opacity: 0.9,
    padding: theme.spacing(1),
    margin : theme.spacing(1),
    borderRadius: 20,
    // height : 50,
    // width : 50,
  },
  
}));


function HomeLogin(props) {
  
  const classes = useStyles();

  const [email, setEmail] = React.useState('');
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const [password, setPassword] = React.useState('');
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const [category, setCategory] = React.useState('seller');
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email : email,
      username : email,
      password : password,
    }
    axios.post('http://127.0.0.1:8000/rest-auth/login/', data )
      .then(res => {
        console.log(res)
        localStorage.setItem("token",JSON.stringify(res.data.key))
        localStorage.setItem("loggedIn",JSON.stringify(true))
        localStorage.setItem("category",JSON.stringify(category)) 
        window.location.href='/'
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  if(!JSON.parse(localStorage.getItem("loggedIn"))){ 
    return (
      <Container className={classes.Container} component="main" maxWidth="sm">
      <CssBaseline />
      <Paper className={classes.Paper} variant="outlined" maxWidth="sm">
      <img src={logo} alt="Stubb-Bee" style={{height:120, width:150}}/>
        <form 
          onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleChangeEmail}
            />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            value={password}
            onChange={handleChangePassword}/>
          <br /> <br />
          <FormControl component="fieldset">
            <FormLabel component="legend">Register as: </FormLabel>
            <RadioGroup row defaultValue="seller" aria-label="category" name="category" value={category} onChange={handleChangeCategory}>
              <FormControlLabel value="seller" control={<Radio />} label="Seller" />
              <FormControlLabel value="transporter" control={<Radio />} label="Transporter" />
              <FormControlLabel value="buyer" control={<Radio />} label="Buyer" />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            LOG IN
          </Button>
        </form>
        <Typography variant="button" display="block" gutterBottom>
          OR
          </Typography>
          <Typography variant="button" display="block"  gutterBottom>
          <Link href='/register' color="secondary">REGISTER</Link>
          </Typography>
      </Paper>
    </Container>
    );
  }
  else{
    if(JSON.parse(localStorage.getItem("category")) === 'buyer')
      {return(<BuyerHome />)}
    else if(JSON.parse(localStorage.getItem("category")) === 'seller')
    {return(<SellerHome />)}
    else if(JSON.parse(localStorage.getItem("category")) === 'transporter')
    {return(<TransporterHome />)}
    else{
      localStorage.setItem("loggedIn",JSON.stringify(false));
      localStorage.setItem("token",'')
      window.location.href='/'
    }
  }
 }
  
  export default HomeLogin;