import React from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Button, Grid } from '@mui/material';

function MinMax(props) {
    return (
        <Grid container spacing={1} style={{marginBottom: "4vh", marginTop: "1vh"}}>
            <Grid item xs={6} style={{ textAlign: 'end' }} >
                <Button variant='outlined' color='primary' startIcon={<AcUnitIcon />} >{props.min}°</Button>

            </Grid>
            <Grid item xs={6} style={{ textAlign: 'start' }} >

                <Button variant='outlined' color='warning' startIcon={<WhatshotIcon />} >{props.max}°</Button>
            </Grid>
        </Grid>
    );
}

export default MinMax;