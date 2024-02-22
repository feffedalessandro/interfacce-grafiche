import React, {useContext, useState} from "react";
import {ordinaAppartamenti, StateContext} from "./Reducer";
import {Button, Card, CardActionArea, CardContent, Menu, MenuItem, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function ListaAppartamenti(){
    const [state, dispatch] = useContext(StateContext)
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);

    const handleClick = (e:any) => setAnchorEl(e.currentTarget)
    const handleClose = () => setAnchorEl(null)
    const handleOrdinamentoChange = (value:any) => {
        //setOrdinamento(value)
        dispatch(ordinaAppartamenti(value))
        handleClose()
    }

    return(
        <div style={{flex:1,}}>
            <Stack
                flexDirection={'row'}
                justifyContent={'flex-end'}
                alignItems={'center'}
                style={{margin:'0 1em'}}
            >
                <div style={{padding:'0 0.5em'}}>
                    <div style={{fontSize:'15px', fontWeight:'bold'}}> ORDINA PER: </div>
                </div>
                <Button
                    endIcon={<ArrowDropDownIcon/>}
                    variant={"outlined"}
                    onClick={handleClick}
                >
                    {state.ordinamento}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => handleOrdinamentoChange('DEFAULT')}>
                        Predefinito
                    </MenuItem>
                    <MenuItem onClick={()=>handleOrdinamentoChange('PREZZO_ASC')}>
                        Prezzo: crescente
                    </MenuItem>
                    <MenuItem onClick={()=>handleOrdinamentoChange('PREZZO_DESC')}>
                        Prezzo: decrescente
                    </MenuItem>
                    <MenuItem onClick={()=>handleOrdinamentoChange('SUPERFICIE_ASC')}>
                        Superficie: crescente
                    </MenuItem>
                    <MenuItem onClick={()=>handleOrdinamentoChange('SUPERFICIE_DESC')}>
                        Superficie: decrescente
                    </MenuItem>

                </Menu>
            </Stack>

            <Stack flexDirection={'row'} flexWrap={'wrap'}>
                {
                    state.appartamentiVisibili.map(appartamento => (
                            <Card
                                key={appartamento.id}
                                style={{
                                    margin: '1em',
                                    width:'20em',
                                }}
                            >
                                <CardActionArea
                                    onClick={() => navigate(`/appartamento/${appartamento.id}`)}
                                >
                                    <CardContent>
                                        <Typography>id: {appartamento.id}</Typography>
                                        <Typography>prezzo: {appartamento.prezzo}</Typography>
                                        <Typography>superficie: {appartamento.superficie}</Typography>
                                        <Typography>tipologiaOfferta: {appartamento.tipologiaOfferta}</Typography>
                                        <Typography>numeroLocali: {appartamento.numeroLocali}</Typography>
                                        <Typography>piano: {appartamento.piano}</Typography>
                                        <Typography>classeEnergetica: {appartamento.classeEnergetica}</Typography>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    )
                }
            </Stack>
        </div>
    )
}
export default ListaAppartamenti
