import React from 'react';
import {CssBaseline, Container, TextField, Button, Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import MyLocationTwoToneIcon from '@material-ui/icons/MyLocationTwoTone';
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


function Profile(props) {
    const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const [first_name, setFirstName] = React.useState('');
  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  }
  const [last_name, setLastName] = React.useState('');
  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  }

  const [latitude, setLatitude] = React.useState('');

  const [longitude, setLongitude] = React.useState('');

  const [phone, setPhone] = React.useState('');
  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  }

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    axios.get('http://127.0.0.1:8000/backend/sellerprofile/',
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
        setLatitude(res.data.latitude)
        setLongitude(res.data.longitude)
        setPhone(res.data.phone)
      })
      .catch(err => {
        console.log(err)
      })
  },[]);

  const handleRegister = (event) => {
    const token = JSON.parse(localStorage.getItem("token"))
    event.preventDefault();
    const data = {
      email : email,
      first_name : first_name,
      last_name : last_name,
      longitude : longitude,
      latitude : latitude,
      phone : phone,
    }
    axios.post('http://127.0.0.1:8000/backend/sellerprofile/', data,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
      } )
      .then(res => {
        setEmail(res.data.email)
        setFirstName(res.data.first_name)
        setLastName(res.data.last_name)
        setLatitude(res.data.latitude)
        setLongitude(res.data.longitude)
        setPhone(res.data.phone)
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
            <div>
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
            </div>
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
            id="phone"
            label="Phone"
            name="phone"
            autoComplete="phone"
            value={phone}
            onChange={handleChangePhone}
            />

            <div>
                <TextField
                variant="filled"
                margin="normal"
                required
                id="latitude"
                label="Latitude"
                name="latitude"
                autoComplete="latitude"
                value={latitude}
                onChange={(event) => {setLatitude(event.target.value)}}
                autoFocus/>

                <TextField
                variant="filled"
                margin="normal"
                required
                id="longitude"
                label="Longitude"
                name="longitude"
                autoComplete="longitude"
                value={longitude}
                onChange={(event) => {setLongitude(event.target.value)}}
                autoFocus/>

                <Button onClick={() =>
                {
                    if(navigator.geolocation){
                        navigator.geolocation.getCurrentPosition((position) =>
                        {
                            console.log(position);
                            setLatitude(position.coords.latitude);
                            setLongitude(position.coords.longitude);
                        })
                    }
                    else{
                        alert("User Denied Location Access")
                    }
                }
                }><MyLocationTwoToneIcon/></Button>
            </div>

          <br /> <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
          >
            CHANGE
          </Button>
        </form>
        
      </Paper>
    </Container>
  );
}
export default Profile;
