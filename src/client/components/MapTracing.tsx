import { useAppSelector } from '../../store/hooks/hooks';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import delivery  from '../assets/delivery.svg'
import marker  from '../assets/marker.svg'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';

const defaultZoom = 13;

export const MapTracing = () => {
  const clientLocation: [number, number] = useAppSelector(state => state.client.clientLocation)
  const clientAddress: string = useAppSelector(state => state.client.clientAddress)

  const markerIcon = L.icon({
    iconUrl: marker,
    iconSize: [40, 40],
    iconAnchor: [19, 39],
  });
  
  const deliveryIcon = L.icon({
    iconUrl: delivery,
    iconSize: [40, 40],
  });

  return (
      <MapContainer center={clientLocation} zoom={defaultZoom} className='mapTracingStyle' >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
        <Marker 
          position={clientLocation} 
          icon={markerIcon}          
        >
          <Popup>
              {clientAddress}
          </Popup>
        </Marker>   
        <Marker 
          position={[clientLocation[0]+0.03, clientLocation[1]+0.02]}  
          icon={deliveryIcon}         
        >
          <Popup>
              Delivery
          </Popup>
        </Marker>  
      </MapContainer>
  );
}
