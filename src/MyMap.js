import React, {useMemo} from "react";
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api"
import "./Map.css"

export default function MyMap({positions}) {
    const [userPos, setUserPos] = React.useState({lat: 40, lng: -80})
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
              "featureType": "poi.business",
              "stylers": [
                {
                  "visibility": "off"
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
              "featureType": "poi.park",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "off"
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
        <GoogleMap zoom={17} center={userPos} mapContainerClassName={"map-container"} options={options}>
            {markers}
        </GoogleMap>
    )

}
