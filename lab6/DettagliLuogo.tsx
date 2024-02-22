import {Outlet, useNavigate, useParams} from "react-router-dom";
import {Button} from "@mui/material";
import React, {useContext} from "react";
import {listaLuoghi} from "./ListaLuoghi";
import HomeIcon from '@mui/icons-material/Home';
import {StateContext} from "./Reducer";

function DettagliLuogo(){
    const {id} = useParams()
    // luogo corrispondente all'id nella lista di luoghi
    const luogo = listaLuoghi[Number(id)]
    const navigate = useNavigate()
    const [state,dispatch] = useContext(StateContext)

    const handleClick = () => {
        const idPrenotazione = state.prenotazioni.length
        navigate(`luogo/${id}/prenotazione/${idPrenotazione}`)
    }

    return (
        <div
            style={{margin:'0 2em'}}
        >
            <Button
                startIcon={<HomeIcon/>}
                onClick={() => navigate('/')}
            >
                Home Page
            </Button>
            <h1>{luogo.nome}</h1>
            <p>Dettagli luogo: {luogo.descrizione}</p>
            <Button
                variant="contained"
                onClick={handleClick}
            >
                Prenotazione
            </Button>

            <Outlet/>
        </div>
    )
}

export default DettagliLuogo
