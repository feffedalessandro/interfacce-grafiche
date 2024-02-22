import {Luoghi} from "./Luoghi";
import {MapContainer, Marker, Popup, TileLayer, Tooltip} from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    IconButton,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import React, {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import MapIcon from '@mui/icons-material/Map';
import ListIcon from '@mui/icons-material/List';

function MappaLuoghi(){
    const navigate = useNavigate()

    return(
        <Box sx={{
            width:{xs:'100%', md:'75%', lg:'75%'},
            height:{xs:'50vh', md:'100vh', lg:'100vh'},
        }}>
            <MapContainer
                center={[45.070339, 7.686864]}
                zoom={12}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {
                    Luoghi.map((luogo, id) => (
                            <Marker
                                key={id}
                                position={luogo.pos}
                                icon={L.icon({iconUrl: icon, iconAnchor: [13, 40]})}
                                eventHandlers={{click: () => navigate(`/luoghi/${luogo.idLuogo}`)}}
                            >
                                <Tooltip>{luogo.nome}</Tooltip>
                            </Marker>
                        )
                    )
                }
            </MapContainer>
        </Box>
    )
}

function ElencoLuoghi(){
    return(
        <Box
            sx={{
                width:{xs:'100%', md:'25%', lg:'25%'},
                height:{xs:'50vh', md:'100vh', lg:'100vh'},
                overflowY: 'scroll'
        }}
        >
            {
                Luoghi.map((luogo, id) => (
                        <div key={id}>
                            <Card // card per ogni tappa
                                key={id}
                                style={{
                                    margin: '1em',
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: 'center'
                                }}
                            >
                                <CardActionArea component={Link} to={`/luoghi/${luogo.idLuogo}`}>
                                    <CardContent>
                                        <Typography>{luogo.nome}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    )
                )
            }
        </Box>
    )
}

function HomePage() {
    return (
        <>
            <Stack
                direction={{ xs: 'column', md: 'row', lg: 'row' }}
            >
                <MappaLuoghi />
                <ElencoLuoghi />
            </Stack>
        </>
    )
}

export default HomePage
