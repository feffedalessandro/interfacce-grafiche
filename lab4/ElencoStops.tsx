import {useContext} from "react";
import {remove, removeAll, StateContext} from "./Reducer";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";

// visualizza elenco delle tappe
export default function ElencoStops() {
    const [state, dispatch] = useContext(StateContext)
    // rimuove singola tappa
    const handleRemove = (id:number) => dispatch(remove(id))
    // rimuove tutte le tappe
    const handleRemoveAll = () => dispatch(removeAll())

    return (
        <div style={{width: '20em', position:'relative'}}>
            <div style={{overflowY:'scroll',  maxHeight: 'calc(100vh - 150px)'}}>

                { // mappa l'array di tappe nello stato
                    state.stops.map((stop,index) => (
                        <div key={stop.id}>
                            <Card // card pe ogni tappa
                                key={stop.id}
                                style={{
                                    margin: '1em',
                                    display:"flex",
                                    flexDirection:"row",
                                    justifyContent:"center",
                                    alignItems:'center'
                                }}
                            >
                                <CardContent // contenuto della Card
                                    style={{flex:1}}>
                                    <Typography variant={'h5'} style={{fontWeight: "bold"}}>
                                        {stop.label}
                                    </Typography>
                                    <Typography> {stop.pos.lat.toFixed(4)} </Typography>
                                    <Typography> {stop.pos.lng.toFixed(4)} </Typography>
                                </CardContent>
                                <CardContent>
                                    <Button // bottone per rimuovere la tappa
                                        onClick={() => handleRemove(stop.id)}> R </Button>
                                </CardContent>
                            </Card>

                            { // mostra la distanza tra due tappe adiacenti
                                // tutte tranne l'ultima tappa --> distanza calcolata fino alla penultima
                                index < state.stops.length - 1 && (
                                    <Typography key={`distance-${stop.id}`}
                                                style={{margin:'0.5em', padding:'0em 2em'}}
                                    >
                                        dist: {Math.round(stop.pos.distanceTo(state.stops[index + 1].pos)/1000)} km
                                    </Typography>
                                )
                            }
                        </div>
                    ))
                }
            </div>

            <div // blocco fissato nella parte inferiore per dist totale e rimozione di tutte le tappe
                style={{
                    position: 'fixed',
                    bottom: 0,
                    backgroundColor:"white",
                    width:'20em',
                    padding:'1em'
                }}
            >
                <h4 style={{textAlign: 'center',
                }}>
                    Total distance: {state.distance}
                </h4>
                <div >
                    {state.stops.length > 0 && (
                        <Button onClick={handleRemoveAll}>
                            REMOVE ALL
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
