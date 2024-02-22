import {useContext, useState} from "react";
import L, {LatLng} from "leaflet";
import {Marker, Polyline, Popup, TileLayer, Tooltip, useMap, useMapEvents} from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import {addFine, addInizio, StateContext} from "./Reducer";
import {Button, Modal, Box, TextField} from "@mui/material";

interface FinestraProps {
    onClose: () => void,
    onSubmit: (nome:string) => void

}

function Finestra({onClose, onSubmit}:FinestraProps){
    const [nome, setNome] = useState('')
    // funzione per submit dell'input
    const handleSubmit = () => {
        if(nome.trim() !== '') {
            onSubmit(nome)
            onClose()
        }
    }

    return(
        <div>
            <Modal open={true} onClose={onClose}>
                <Box
                    sx={{
                        position:'absolute',
                        top:'50%',
                        left:'50%',
                        transform:'translate(-50%, -50%)',
                        width:'13em',
                        borderRadius:"0.5em",
                        backgroundColor: 'background.paper',
                        boxShadow: 24,
                        p:'1.5em'
                    }}
                >
                    <h3>Add stop</h3>
                    <h4 style={{color:"gray"}}>Enter name:</h4>
                    <TextField
                        label={'Stop name'}
                        value={nome}
                        onChange={(e:any) => setNome(e.target.value)}
                        variant={'filled'}
                    />
                    <div
                        style={{
                            margin:"2em 0 0 0",
                            display:'flex',
                            justifyContent:"flex-end",
                            flexDirection:'row',
                        }}
                    >
                        <Button onClick={onClose}>
                            CANCEL
                        </Button>
                        <Button onClick={handleSubmit}>
                            ADD
                        </Button>
                    </div>

                </Box>
            </Modal>
        </div>
    )
}


function Mappa(){
    // stato corrente
    const [state, dispatch] = useContext(StateContext)
    const [open, setOpen] = useState(false)
    const [tempCoord, setTempCoord]
        = useState<LatLng|undefined>();
    const [isShiftPressed, setIsShiftPressed] = useState(false);


    useMapEvents({
        click: (e) => {
            setTempCoord(e.latlng)
            setIsShiftPressed(e.originalEvent.shiftKey)
            setOpen(true)
        }
    })

    const handleFinestraSubmit = (nome:string) => {
        setOpen(false)
        if (tempCoord !== undefined) {
            if (!isShiftPressed) {
                dispatch(addFine(nome, tempCoord))
            } else {
                dispatch(addInizio(nome, tempCoord))
            }
        }
    }

    return <>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {
            // marker per ogni stop, con id e posizione
            state.stops.map((stop) =>
                <Marker
                    key={stop.id}
                    position={stop.pos}
                    icon={L.icon({iconUrl: icon, iconAnchor: [13, 40]})}
                >
                    <Popup>{stop.pos.toString()} - {stop.id} - {stop.label}</Popup>
                </Marker>
            )
        }
        <Polyline positions={state.stops.map(stop => stop.pos)}/>
        {
            open && <Finestra
                onClose={() => setOpen(false)}
                onSubmit={handleFinestraSubmit}
            />
        }
    </>
}

export default Mappa;
