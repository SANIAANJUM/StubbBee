import React from 'react';
import {CssBaseline, Container, TextField,  FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Button, Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  Container: {
    display : 'flex',
    flexWrap : 'wrap',
  },
  Paper:{
    opacity: 0.9,
    padding: theme.spacing(2),
    borderRadius: 32,
  },
  
}));


function Register(props) {
  const classes = useStyles();
  const [category, setCategory] = React.useState('seller');
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  }
  const [email, setEmail] = React.useState('');
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }
  const [password, setPassword] = React.useState('');
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }
  const [first_name, setFirstName] = React.useState('');
  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  }
  const [last_name, setLastName] = React.useState('');
  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  }
  const handleRegister = (event) => {
    event.preventDefault();
    const data = {
      email : email,
      username : email,
      password : password,
      first_name : first_name,
      last_name : last_name,
      category : category,
    }
    axios.post('http://127.0.0.1:8000/backend/register/', data )
      .then(res => {
        console.log(res)
        window.location.href='/'
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <Container className={classes.Container} component="main" maxWidth="sm">
      <CssBaseline />
      <Paper className={classes.Paper} variant="outlined" maxWidth="sm">
        <form 
          onSubmit={handleRegister}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="First Name"
            name="first_name"
            autoComplete="first_name"
            value={first_name}
            onChange={handleChangeFirstName}
            autoFocus/>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="Last Name"
            name="last_name"
            autoComplete="last_name"
            value={last_name}
            onChange={handleChangeLastName}
            />
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
            color="secondary"
          >
            REGISTER
          </Button>
        </form>
        
      </Paper>
    </Container>
  );
  }
  
  export default Register;