import React from "react";
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api"
import "./Map.css"

export default function MyMap({positions}) {
    const [userPos, setUserPos] = React.useState({lat: 40, lng: -80})
    const optionsMap = {
        disableDefaultUI: true
    }
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
    })

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const userPosition = {lat: pos.coords.latitude, lng: pos.coords.longitude}
            console.log(userPosition)
            setUserPos(userPosition)
        })
    }, [])

    const markers = positions.map((position, index) => {
        return <MarkerF position={position}
                        key={index}

        />
    })
    if (!isLoaded) {
        return <div>Loading...</div>
    }
    return (
        <GoogleMap zoom={10} center={userPos} mapContainerClassName={"map-container"} options={optionsMap}>
            {markers}
        </GoogleMap>
    )

}
