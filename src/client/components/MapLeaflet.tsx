import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { updateClientAddress, updateClientLocation } from '../../store/client/clientSlice';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import marker  from '../assets/marker.svg'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';

const defaultZoom = 17;

export const MapLeaflet = () => {
  const dispatch = useAppDispatch();
  const clientLocation: [number, number] = useAppSelector(state => state.client.clientLocation)
  const clientAddress: string = useAppSelector(state => state.client.clientAddress)

  const markerIcon = L.icon({
      iconUrl: marker,
      iconSize: [40, 40],
      iconAnchor: [19, 39],
  });
  
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        dispatch(updateClientLocation([e.latlng.lat, e.latlng.lng]))
        dispatch(updateClientAddress('Ubicación seleccionada'))
      },     
    });
    return null;
  }

  return (
      <MapContainer center={clientLocation} zoom={defaultZoom} className='mapLeafletStyle'>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
        <EsriLeafletGeoSearch 
          position='topright'
          useMapBounds={false}
          placeHolder='Buscar lugares o dirección'
          providers={{
            arcgisOnlineProvider: {
              apikey: import.meta.env.VITE_API_KEY_ARCGIS
            }
          }}
          eventHandlers={{
            results: (r:L.LeafletMouseEvent | any ) => {
              dispatch(updateClientLocation([r.latlng.lat, r.latlng.lng]))
              dispatch(updateClientAddress(r.text))
            }
          }}
          />
        <Marker 
          position={clientLocation} 
          icon={markerIcon} 
        >
          <Popup>
              {clientAddress}
          </Popup>
        </Marker>
        <MapEvents />       
      </MapContainer>
  );
}
