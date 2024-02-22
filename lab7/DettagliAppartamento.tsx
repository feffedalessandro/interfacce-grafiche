import React, {useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Stack} from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import HomeIcon from '@mui/icons-material/Home';
import {StateContext} from "./Reducer";

function DettagliAppartamento(){
    const navigate = useNavigate()
    const {id} = useParams()
    const idAppartamento = Number(id)
    const [state] = useContext(StateContext)

    const currentIndex = state.appartamentiVisibili.findIndex(
        appartamento => appartamento.id === idAppartamento
    )
    const navigateToPrevious = () => {
        if (currentIndex > 0) {
            const previousApartmentId = state.appartamentiVisibili[currentIndex - 1].id
            navigate(`/appartamento/${previousApartmentId}`)
        }
    }
    const navigateToNext = () => {
        if (currentIndex < state.appartamentiVisibili.length - 1) {
            const nextApartmentId = state.appartamentiVisibili[currentIndex + 1].id
            navigate(`/appartamento/${nextApartmentId}`)
        }
    }

    return(
        <div>
            <Stack
                flexDirection={'row'}
                justifyContent={"space-between"}
                style={{padding:'0 5em'}}
            >
                <Button
                    startIcon={<ArrowCircleLeftIcon/>}
                    variant={'outlined'}
                    onClick={navigateToPrevious}
                    disabled={currentIndex <= 0}
                >
                    PRECEDENTE
                </Button>
                <Button
                    startIcon={<HomeIcon/>}
                    variant={'contained'}
                    onClick={() => navigate('/')}
                >
                    HOME PAGE
                </Button>
                <Button
                    endIcon={<ArrowCircleRightIcon/>}
                    variant={'outlined'}
                    onClick={navigateToNext}
                    disabled={currentIndex >= state.appartamentiVisibili.length - 1}
                >
                    SUCCESSIVO
                </Button>
            </Stack>
            <h2>Dettagli appartamento {id} </h2>
        </div>
    )
}
export default DettagliAppartamento
