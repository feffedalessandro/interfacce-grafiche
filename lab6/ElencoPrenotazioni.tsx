import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardContent, Typography} from "@mui/material";
import React, {useContext, useState} from "react";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {modify, Prenotazione, remove, StateContext} from "./Reducer";
import {listaLuoghi} from "./ListaLuoghi";



export function ElencoPrenotazioni(){
    const navigate = useNavigate()
    const [state, dispatch] = useContext(StateContext)
    const handleRemove = (id:number) => dispatch(remove(id))
    const handleModify = (id:number, prenotazione:Prenotazione) => {
        dispatch(modify(id, prenotazione))
        navigate(`/prenotazione/${prenotazione.id}`)
    }

    return(
        <div style={{margin:'0 2em'}}>
            <Button
                startIcon={<HomeIcon/>}
                onClick={() => navigate('/')}
            >
                Home Page
            </Button>
            <h1>Elenco Prenotazioni</h1>
            <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                {
                    state.prenotazioni.map(prenotazione => (
                        <Card
                            key={prenotazione.id}
                            style={{
                                margin: '1em',
                                width:320
                            }}
                        >
                            <CardContent>
                                <Typography>{prenotazione.luogo.nome}</Typography>
                                <Typography>Data: {prenotazione.data}</Typography>
                                <Typography>Ora: {prenotazione.ora}</Typography>
                                <Typography>Nome: {prenotazione.nome}</Typography>
                                <Typography>Cognome: {prenotazione.cognome}</Typography>
                                <Typography>Numero di telefono: {prenotazione.numero}</Typography>
                            </CardContent>
                            <CardContent style={{padding:0, display:'flex', justifyContent:'flex-end'}}>
                                <Button
                                    onClick={() => handleModify(prenotazione.id, prenotazione)}
                                >
                                    <EditIcon/></Button>
                                <Button
                                    onClick={() => handleRemove(prenotazione.id)}
                                >
                                    <DeleteIcon/></Button>
                            </CardContent>

                        </Card>
                    ))
                }
            </div>

        </div>
    )
}

