import React from 'react';
import {CssBaseline, Paper, Card, CardContent, CardActionArea, Typography, Grid, Button} from '@material-ui/core'
import axios from 'axios'
import paper from 'paper';
import Sketch from './Sketch'



function Productions(props) {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"))
        axios.get('http://127.0.0.1:8000/backend/productions/',
        {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        }
        )
        .then(res => {
            setData(res.data);
            console.log(data);
        })
        .catch(err => {
            console.log(err)
        })
    },[]);

    class FormsAndInputs extends Component {
        constructor(props){
            super(props)
            this.state = {
                mynegotiablevalue: '',
                myValue: ''
            }
            this.inputnegotiablevalueRef = React.createRef()
        }
    


    handleInputChange = (event) => {
        event.preventDefault()
       // console.log(event)
       // console.log(event.target.name)
       // console.log(event.target.value)
       this.setState({
           [event.target.name]: event.target.value
       })
    }

    handleFocusClick = (event) => {
        event.preventDefault()
            this.inputEmailRef.current.focus()
    }
    handleClearClick = (event) => {
        event.preventDefault()
            this.inputFullNameRef.current.value = ''
            this.setState({
                myFullName: ''
            })
    }
    
    return(
        <Paper>
            <CssBaseline />
            {data.length > 0 ? <Grid container justify="center" spacing={2}>
                {data.map(p => (
                        <Grid item key={p.id}>
                        <Card >
                            <CardContent>
                                <Typography variant="h3" component="h2">
                                    {p.name}
                                </Typography>
                                <Typography variant="h4" component="h2">
                                    {p.crop_name}
                                </Typography> 
                                <Typography variant="h5" component="h2">
                                    Planted Date : {p.planted_date} 
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    Harvest Date : {p.harvested_date}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    Land Area Size : {p.size} Acre
                                </Typography> 
                            </CardContent>
                            <CardActionArea>
                                {p.order_status === 'Order' &&
                                <div>
                                <Typography variant="h5" component="h2">
                                    Production Price : INR {p.production_price}
                                </Typography>
                                <Button color="secondary"
                                variant="contained"
                                onClick={(event) => {
                                    const token = JSON.parse(localStorage.getItem("token"));
                                    axios.post('http://127.0.0.1:8000/backend/generateorderbought/',{id : p.id},
                                    {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Token ${token}`,
                                    },
                                    }
                                    )
                                    .then(res => {
                                        
                                        console.log(res.data);
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                                }}
                                >Sell</Button>
                                <Button 
                                variant="contained"
                                onClick={(event) => {
                                    const token = JSON.parse(localStorage.getItem("token"));
                                    axios.post('http://127.0.0.1:8000/backend/generateordercancelled/',{id : p.id},
                                    {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Token ${token}`,
                                    },
                                    }
                                    )
                                    .then(res => {
                                        setData(res.data);
                                        console.log(data);
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                                }}
                                >Cancel</Button>
                                *******<Button 
                                variant="contained"
                                onClick={(event) => {
                                    const token = JSON.parse(localStorage.getItem("token"));
                                    axios.post('http://127.0.0.1:8000/backend/generateordercancelled/',{id : p.id},
                                    {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Token ${token}`,
                                    },
                                    }
                                    )
                                    .then(res => {
                                        //this.setState({alert_message:"Negotiate" })
                                        <div>
                                            <h1>Forms and Inputs</h1>
                                                <p>Negotiable value is: {negotiablevalue}</p>
                                                    <form onSubmit={this.handleSubmit}>
                                                    <MyInputBlock onChange={this.handleInputChange} inputnegotiablevalue="mynegotiablevalue" inputContentValue='myValue'/>
                                                    <p><button>Send Message</button></p>
                                                    <p><button onClick={this.handleFocusClick}>Focus</button></p>
                                                    <p><button onClick={this.handleClearClick}>Clear</button></p>
                                                    </form>
                                                </div>

                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                                }}
                                >Cancel</Button>******</div>
                                }
                            </CardActionArea>
                        </Card>
                        </Grid>
                ))}
            </Grid> : <Typography variant="h1">No Productions</Typography>}
        </Paper>
        
    )
}
export default Productions;
