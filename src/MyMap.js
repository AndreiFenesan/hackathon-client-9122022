import React, {useMemo} from "react";
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api"
import "./Map.css"

const positions = [{lat: 44, lng: -80}, {lat: 45, lng: -90}]

export default function MyMap(pos) {
    const options = {
        disableDefaultUI: true,
        styles: [
            {
              "featureType": "administrative.country",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e6f737"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#edfcfc"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ade3a6"
                }
              ]
            },
            {
              "featureType": "poi.sports_complex",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#a1e19e"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#f0f1ce"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#656147"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#dd62bc"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#4f2644"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#e9c1be"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#a28282"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#a3aaec"
                }
              ]
            }
          ]
    };

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
        <GoogleMap zoom={10} center={pct} mapContainerClassName={"map-container"} options={options}>
            {markers}
        </GoogleMap>
    )

}
