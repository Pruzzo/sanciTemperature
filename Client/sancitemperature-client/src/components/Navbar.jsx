import "../css/navbar.css";
import { Box, SvgIcon, Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import { BackButtonContext } from "../context/BackButtonContext";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useLocation, useNavigate } from "react-router-dom";



function Navbar(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const {backButton, showBackButton} = useContext(BackButtonContext);
    
    return (
        <Box className="navbar" >
            <Grid container spacing={1}>
                <Grid item xs={3} className="navelement">
                    {backButton ?
                        <SvgIcon className="navBackButton"
                            component={ArrowBackRoundedIcon} onClick={() => navigate(-1)} /> :
                        <div></div>}
                </Grid>
                <Grid onClick={() => {
                    if (location.pathname !== "/settings")
                        navigate('/settings')
                }} item xs={6} className="navelement" >
                    {location.pathname !== "/settings" &&
                        (<h2 className="navbar-title">
                            Temperatura Sanci
                        </h2>)}
                </Grid>
                <Grid item xs={3} className="navelement" >
                </Grid>
            </Grid>

            {/* <img src="rrlogo-white.webp" className="navbar-image" title="navbar image" /> */}
        </Box>
    );
}

export default Navbar;