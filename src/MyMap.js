import React, {useMemo} from "react";
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api"
import "./Map.css"

const positions = [{lat: 44, lng: -80}, {lat: 45, lng: -90}]

export default function MyMap(pos) {
    const pct = useMemo(() => ({lat: 44, lng: -80}), [])

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
    })

    const markers = positions.map((p, index) => {
        return <MarkerF position={p}
                       key={index}/>
    })
    if (!isLoaded) {
        return <div>Loading...</div>
    }
    return (
        <GoogleMap zoom={10} center={pct} mapContainerClassName={"map-container"} >
            {markers}
        </GoogleMap>
    )

}
