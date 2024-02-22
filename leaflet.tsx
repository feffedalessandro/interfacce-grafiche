import 'leaflet/dist/leaflet.css'
import {MapContainer, Marker, TileLayer, Tooltip, Popup,
    useMapEvents, useMap} from "react-leaflet";
import L, {LatLng, LatLngTuple} from 'leaflet'
import icon from "leaflet/dist/images/marker-icon.png"

function LocationMarker() {
    const [position, setPosition] =
        useState<LatLng>(new LatLng(0,0))
    const map = useMap()
    useMapEvents({
            click: e=>{
                const ll = e.latlng
                setPosition(ll)
                map.flyTo(ll)
            }
    })
    return (
        <Marker
            position={position}
            icon={L.icon({ iconUrl: icon, iconAnchor: [13, 40] })}
        >
            <Tooltip>{position.toString()}</Tooltip>
            <Popup>ciao</Popup>
        </Marker>
    )
}

function App() {
    const position: LatLngTuple = [45.06467,7.656784]

    return(
        <div>
            <MapContainer
                center={position}
                zoom={12}
                style={{height:'100vh'}}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <LocationMarker/>
            </MapContainer>
        </div>
    )
}

export default App;
