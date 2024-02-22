import React, {useState} from "react";
import {
    Box,
    IconButton,
    Stack,
    ToggleButtonGroup
} from "@mui/material";
import MapIcon from '@mui/icons-material/Map';
import ListIcon from '@mui/icons-material/List';
import {Outlet, useNavigate} from "react-router-dom";
import Filtri from "./Filtri";

function HomePage(){
    const [view, setView] = useState('mappa')
    const navigate = useNavigate()
    const handleView = (newView:any) =>{
        setView(newView)
        navigate(`/${newView}`)
    }

    return(
        <>
            <h2 style={{marginLeft:'0.5em'}}>Appartamenti</h2>
            <Stack
                direction={{ xs: 'column', sm: 'column', md: 'row' }}
                alignItems={'stretch'}
                sx={{height: '100vh'}}
            >
                <Box
                    //width: '15em', marginRight:'0.5em'
                    sx={{
                        width: '100%', // Occupa l'intera larghezza su mobile
                        maxWidth: {xs: '100%', sm: '100%', md: '15em'}, // Larghezza massima su tablet e desktop
                        marginRight: {xs: 0, sm: 0, md: '0.5em'}, // Margine destro solo su desktop
                        marginBottom: {xs: '0.5em', sm: '0.5em', md: 0}, // Margine inferiore solo su mobile e tablet
                    }}
                >
                    <div style={{fontSize: '15px', fontWeight: 'bold', margin: '0.5em 0'}}> VISUALIZZAZIONE </div>
                    <ToggleButtonGroup
                        style={{border: '0.5px solid grey', marginBottom: '0.5em'}}
                        value={view} //value={'mappa'} fa partire la mappa di default
                        exclusive
                        onChange={(event, newValue) => {
                            setView(newValue)
                        }}
                    >
                        <IconButton onClick={() => handleView('mappa')}><MapIcon/></IconButton>
                        <IconButton onClick={() => handleView('lista')}><ListIcon/></IconButton>
                    </ToggleButtonGroup>
                    <Filtri/>
                </Box>
                <Outlet/>
            </Stack>
        </>
    )
}

export default HomePage
