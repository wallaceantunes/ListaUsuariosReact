import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const L = window.L
function Map({position}) {
    const mapRef = useRef()
    return (
        <MapContainer ref={mapRef} className="map" center={L.latLng(position[0], position[1])} bounds={L.latLngBounds(position)} zoom={2} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
            </Marker>
        </MapContainer>
    )
}

export default Map;