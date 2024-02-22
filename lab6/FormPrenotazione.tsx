import HomeIcon from "@mui/icons-material/Home";
import {Button, Container, Stack, TextField} from "@mui/material";
import React, {useContext, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Luoghi} from "./Luoghi";
import {Prenotazione, StateContext, submit} from "./Reducer";

function FormPrenotazione(){
    const navigate = useNavigate()
    const [state,dispatch] = useContext(StateContext)

    const [data, setData] = useState('')
    const [ora, setOra] = useState('');
    const [nome, setNome] = useState('')
    const [cognome, setCognome] = useState('')
    const [numero, setNumero] = useState('')

    // casi in cui il button submit è disabilitato
    const submitError = ()=>{
        if(!data || !ora || !nome || !cognome || !numero)
            return true
        if(new Date(data) <= new Date())
            return true
        return false
    }

    const {luogoId, prenotazioneId} = useParams()
    const luogo = Luoghi.find((luogo) => luogo.idLuogo === Number(luogoId))
    const idPrenotazione = Number(prenotazioneId)

    if (!luogo) {
        console.error(`Luogo non trovato per l'id ${luogoId}`);
        return null
    }
    const handleSubmit = () => {
        dispatch(submit({idPrenotazione, luogo, data, ora, nome, cognome, numero}))
        navigate(`/prenotazioni`)
    }
    return(
        <>
            <Button
                startIcon={<HomeIcon/>}
                onClick={() => navigate('/')}
            >
                Home Page
            </Button>

            <h2>Prenotazione per {luogo.nome} </h2>

            <div>
                <TextField
                    type={'date'}
                    value={data}
                    style={{margin: '1em'}}
                    onChange={e => setData(e.target.value)}
                />
                <TextField
                    type={'time'}
                    value={ora}
                    style={{margin: '1em'}}
                    onChange={e => setOra(e.target.value)}
                />
            </div>
            <Stack flexWrap={'wrap'} direction={'row'}>
                <TextField
                    style={{margin: '1em'}}
                    label={'Nome'}
                    value={nome}
                    variant={'standard'}
                    onChange={e => setNome(e.target.value)}
                />
                <TextField
                    style={{margin: '1em'}}
                    label={'Cognome'}
                    value={cognome}
                    variant={'standard'}
                    onChange={e => setCognome(e.target.value)}
                />
                <TextField
                    style={{margin: '1em'}}
                    label={'Numero di telefono'}
                    value={numero}
                    variant={'standard'}
                    onChange={e => setNumero(e.target.value)}
                />
            </Stack>
            <Button
                style={{margin: '1em'}}
                variant={'contained'}
                onClick={handleSubmit}
                disabled={submitError()}
            >
                SUBMIT
            </Button>

        </>
    )
}

export default FormPrenotazione
