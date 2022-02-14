import React from 'react';
import {CssBaseline, Paper, Card, CardContent, Typography, Grid} from '@material-ui/core'
import axios from 'axios'

function SoldProductions(props) {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"))
        axios.get('http://127.0.0.1:8000/backend/soldproductions/',
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
    
    return(
        <Paper>
            <CssBaseline />
            {data.length > 0 ? 
                <Grid container justify="center" spacing={2}>
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
                                    Buyer's Phone : {p.buyers_phone}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    Price : INR {p.production_price}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    Status : {p.order_status === 'Bought' ? 'Transport Awaited' : 'Transported'}
                                </Typography>
                            </CardContent>
                        </Card>
                        </Grid>
                ))}
            </Grid>
            : <Typography variant="h1">No Sold Productions</Typography>}
        </Paper>
        
    )
}
export default SoldProductions;
