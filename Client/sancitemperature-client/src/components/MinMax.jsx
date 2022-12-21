import React from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Button, Grid } from '@mui/material';

function MinMax(props) {
    return (
        <Grid container spacing={1} style={{marginBottom: "4vh", marginTop: "1vh"}}>
            <Grid item xs={6} style={{ textAlign: 'end' }} >
                <Button variant='outlined' color='primary'  endIcon={<AcUnitIcon />} >{props.min.name} | {props.min.temperatura}°</Button>

            </Grid>
            <Grid item xs={6} style={{ textAlign: 'start' }} >

                <Button variant='outlined' color='warning' endIcon={<WhatshotIcon />} > {props.max.name} | {props.max.temperatura}° </Button>
            </Grid>
        </Grid>
    );
}

export default MinMax;