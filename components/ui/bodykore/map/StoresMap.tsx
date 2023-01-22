//import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Coordinates, Store } from 'services/graphCMS';
import { useEffect, useRef } from 'react';
import icon from '../../../../public/svg/mapMarker.svg';
import L from 'leaflet';
import { StoreStrapi } from 'services/strapi/store';


const newicon = new L.Icon({
  iconUrl: "/svg/mapMarker.svg", // require the path to the asset
  iconAnchor: [14, 36],
  popupAnchor: [10, -44],
  iconSize: [28, 36],
})

const DEFAULT_ZOOM = 8;

interface StoresMapProps {
  stores: StoreStrapi[];
  coord?: Coordinates;
}

const StoresMap = ({ stores, coord }: StoresMapProps) => {
  const mapStores = () => {
    return stores.map((item, index) => (
      <Marker
        key={index}
        position={[item.attributes.latitude, item.attributes.longitude]}
        draggable={false}
        icon={newicon}
      >
        <Popup>{item.attributes.title.toUpperCase()}</Popup>
      </Marker>
    ));
  };

  const mapRef: any = useRef();

  useEffect(() => {
    if (coord) {
      const time = Math.abs(DEFAULT_ZOOM - mapRef.current?._zoom) * 0.25 + 0.50;
      mapRef.current?.flyTo([coord.latitude, coord.longitude], DEFAULT_ZOOM, {
        duration: time,
      });
    } else if (!coord) {
      // resetMap();
    }
  }, [coord]);

  return (
    <MapContainer
      center={[stores[0].attributes.latitude, stores[0].attributes.longitude]}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/off2on/cl0hxi4ql000115o9535ccwbr/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2ZmMm9uIiwiYSI6ImNrcHM5dTdweTA4YncycG8xbzBxMHlqMWYifQ.QoQslFiXHbvPYZpXavjjew`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      {mapStores()}
    </MapContainer>
  );
};

export default StoresMap;
