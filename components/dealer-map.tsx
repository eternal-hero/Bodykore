import {
    useEffect, useRef, useState,
} from 'react';
import {
    MapContainer, TileLayer, Marker, Popup, FeatureGroup, useMapEvents, useMap,
} from 'react-leaflet';
import L from 'leaflet';

function ChangeMapView({ coords } :any){
    const map = useMap();
    console.log(coords)
    map.setView(coords, map.getZoom());
    return null;
}

export default function DealerMap({ coords } :any) {
    console.log(coords);
    const mapRef = useRef<L.Map>();
    
    return(
        <>
         <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
            integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
            crossOrigin=""/>
        <MapContainer
            center={[coords[0], coords[1]]}
            zoom={14}
            scrollWheelZoom={true}
            whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
            style={{ height: '600px', width: '600px' }}
        >
            <ChangeMapView coords={coords}/>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[coords[0], coords[1]]} >
            </Marker>
        </MapContainer>
        </>
    )
}