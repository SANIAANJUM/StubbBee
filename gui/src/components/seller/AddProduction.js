import React from 'react';
import {CssBaseline, TextField, Button, Paper, Input} from '@material-ui/core'
import MyLocationTwoToneIcon from '@material-ui/icons/MyLocationTwoTone';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    Paper:{
      padding: theme.spacing(2),
      borderRadius: 10,
      flex: 'wrap',
    },
    Add:{
        margin : theme.spacing(2),
    },
  }));

function AddProduction(props) {
    const token = JSON.parse(localStorage.getItem("token"));
    const classes = useStyles();
    const [latitude, setLatitude] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);

    const [name, setName] = React.useState('');
    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const [crop_name, setCropName] = React.useState('');
    const handleChangeCropName = (event) => {
        setCropName(event.target.value);
    }

    const [plantedDate, setPlantedDate] = React.useState(new Date());
    const handlePlantedDateChange = (date) => {
        setPlantedDate(date);
    };

    const [harvestedDate, setHarvestedDate] = React.useState(new Date());
    const handleHarvestedDateChange = (date) => {
        setHarvestedDate(date);
    };

    const [crop_img, setCropImg] = React.useState();
    const handleChangeCropImg = (event) => {
        setCropImg(event.target.files[0]);
    }

    const [size, setSize] = React.useState('');
    const handleChangeSize = (event) => {
        setSize(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const access_token = `Token ${token}`;
        const data = new FormData();
        data.append('name', name);
        data.append('crop_name', crop_name);
        data.append('size', size);
        data.append('crop_img', crop_img, crop_img.name);
        data.append('planted_date', plantedDate.toISOString().split('T')[0]);
        data.append('harvested_date', harvestedDate.toISOString().split('T')[0]);
        data.append('longitude', longitude);
        data.append('latitude', latitude);
        axios.post('http://127.0.0.1:8000/backend/productions/', data, {
            headers: {
            'Authorization': access_token,
            'Content-Type' : 'multipart/form-data'
          }
        })
          .then(res => {
            console.log(res)
            alert("Production Added!")
            window.location.href='/'
          })
          .catch(err => {
            console.log(err)
            alert("Production May Not Be Added!")
            window.location.href='/'
          })
        // console.log(access_token);
        // fetch('http://127.0.0.1:8000/backend/productions/', {
        //     method: 'POST',
        //     body: data,
        //     headers : {
        //         'Authorization': access_token,
        //         'Content-Type' : 'multipart/form-data'
        //       },
        //   })
        //   .then( res => console.log(res))
        //   .catch(error => console.log(error))
        
        // console.log(data);
    }


    return(
        <Paper className={classes.Paper}>
            <CssBaseline />
            <form onSubmit={handleSubmit}>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={handleChangeName}
                autoFocus/>

                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="crop_name"
                label="Crop Name"
                name="crop_name"
                autoComplete="crop_name"
                value={crop_name}
                onChange={handleChangeCropName}
                autoFocus/>

                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="size"
                label="Land Size in Acre"
                name="size"
                autoComplete="size"
                value={size}
                onChange={handleChangeSize}
                autoFocus/>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="planted_date"
                    name="planted_date"
                    label="Planted Date"
                    value={plantedDate}
                    onChange={handlePlantedDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="harvested_date"
                    name="harvested_date"
                    label="Harvested Date"
                    value={harvestedDate}
                    onChange={handleHarvestedDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </MuiPickersUtilsProvider>
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
            <div>
            <Input 
            required
            id="crop_img"
            label="Crop Image"
            name="crop_img"
            onChange={handleChangeCropImg}
            type="file" />
            </div>
            <Button
            className={classes.Add}
            type="submit"
            variant="contained"
            color="primary"
            >Add Production</Button>
            </form>

            
            
        </Paper>
    )
}
export default AddProduction;
