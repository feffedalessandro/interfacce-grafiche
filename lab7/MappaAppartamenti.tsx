import React, {useContext} from "react";
import {MapContainer, Marker, TileLayer, Tooltip} from "react-leaflet";
import {StateContext} from "./Reducer";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";

function MappaAppartamenti(){
    const [state] = useContext(StateContext)

    return(
        <>
            <MapContainer
                center={[45.070339, 7.686864]}
                zoom={15}
                style={{flex: 1}}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {
                    state.appartamentiVisibili.map(appartamento => (
                        <Marker
                            key={appartamento.id}
                            position={[appartamento.posizione.lat, appartamento.posizione.long]}
                            icon={L.icon({iconUrl: icon, iconAnchor: [13, 40]})}
                        >
                            <Tooltip>{appartamento.id}</Tooltip>
                        </Marker>
                        )
                    )
                }
            </MapContainer>
        </>
    )
}
export default MappaAppartamenti
