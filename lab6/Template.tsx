import {AppBar, Button, Container, Menu, Toolbar, Typography, IconButton, MenuItem} from "@mui/material";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";
import MenuIcon from "@mui/icons-material/Menu";

function Template(){
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)
    const handleOpenMenu = (e:any) => setAnchorEl(e.currentTarget)
    const handleCloseMenu = () => setAnchorEl(null)
    const handleClick = () => navigate('/prenotazioni')

    return(
        <Container maxWidth={'xl'} >
            <AppBar position={'static'} sx={{}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2, display:{xs:'block', md:'none', lg:'none'}}}
                        onClick={handleOpenMenu}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                        <MenuItem onClick={handleClick} > Elenco prenotazioni </MenuItem>
                    </Menu>
                    <Typography
                        variant={'h4'}
                        noWrap
                        sx={{mr: 2, fontWeight: 700}}
                    >
                        Visite guidate
                    </Typography>
                    <Button
                        onClick={handleClick}
                        sx={{color: 'white', display:{xs:'none', md:'block', lg:'block'} }}
                    >
                        Elenco prenotazioni
                    </Button>
                </Toolbar>
            </AppBar>
            <hr/>
            <Outlet/>
        </Container>
    )
}
export default Template
