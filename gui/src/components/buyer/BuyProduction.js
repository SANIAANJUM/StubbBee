import React, {useState} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl'

function BuyProduction(props) {
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        width: "100vw",
        height: "100vh",
        zoom: 10
      });
      
      
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) =>
        {
            setViewport({latitude : position.coords.latitude, 
                longitude : position.coords.longitude,
                width: "100vw",
                height: "100vh",
                zoom: 10,
            });
        })
    }
    else{
        alert("User Denied Location Access")
    }
    

    

    return(
        <div><h1>Buy Productions Page</h1>
        <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={'pk.eyJ1IjoiaGFyc2hyYW1hbmRhcyIsImEiOiJja2Q3cnQ1ZXgwOGJoMnJudjVyaTRqcnFuIn0.3cW5IbM6FfVW21fXKS19dQ'}
        // mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/luchi/ckd776u0j0nr31ilpv3pn2q9i"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
          
        
      </ReactMapGL>
        </div>
    )
}
export default BuyProduction;
