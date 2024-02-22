import 'leaflet/dist/leaflet.css'
import {MapContainer, Marker, TileLayer, Tooltip, Popup,
    useMapEvents, useMap} from "react-leaflet";

import {Box, Stack} from "@mui/material";
import Mappa from "./Mappa";
import ElencoStops from "./ElencoStops";



function MainPanel() {
    return(
        <Stack /*div con display flex*/
            direction={'row'}
            alignItems={'stretch'}
            sx={{height:'100vh'}}
        >
            <MapContainer
                center={[45.06, 7.68]}
                zoom={7}
                style={{flex:1}}
            >
                <Mappa/>
            </MapContainer>
            <ElencoStops/>
        </Stack>
    )
}

export default MainPanel;
