import React, {useMemo} from "react";
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api"
import "./Map.css"
import icon from "../../full-moon.png"
import parkIcon from "../../signage.png"

export default function MyMap({positions, userPosition, setNewParking, setViewCoordinates}) {
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

    const [mapRef, setMapRef] = React.useState(null);
    const handleOnLoad = map => {
        setMapRef(map);
    };

    function handleOnCenterChanged() {
        if (mapRef !== null) {
            console.log(mapRef.getZoom())
            setViewCoordinates({
                lat: mapRef.getCenter().lat(),
                lng: mapRef.getCenter().lng(),
            })
        }
    }

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
    })

    const markers = positions.map(position => {
        const latAndLng = {lat: position.lat, lng: position.lng}
        return <MarkerF position={latAndLng}
                        key={position.id}
                        onClick={() => setNewParking({id: position.id, name: position.name})}
                        icon={parkIcon}
        />
    })

    const userLocationMarker = <MarkerF position={userPosition} icon={icon}/>

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    return (
        <GoogleMap zoom={17}
                   center={userPosition}
                   mapContainerClassName={"map-container"}
                   options={options}
                   onLoad={handleOnLoad}
                   onCenterChanged={handleOnCenterChanged}
        >
            {markers.length > 0 && markers}
            {userLocationMarker}
        </GoogleMap>
    )

}
