import { Button, MenuItem, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from './Loading';

function Settings(props) {
    const baseUrl = `${process.env.REACT_APP_SERVER_URL}api/v1/settings`;
    const [value, setValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [interval, setInterval] = useState('1000000');
    const intervals = [
        {
            value: '1000000',
            label: 'secondi',
        },
        {
            value: '60000000',
            label: 'minuti',
        },
        {
            value: '3600000000',
            label: 'ore',
        }
    ];

    useEffect(() => {
        getServerValue();
    }, []);
    const getServerValue = async () => {

        var res = await fetch(`${baseUrl}/getsleep`)
            .then((data) => data.json())
            .then((initValue) => {
                setIsLoading(false);
                if ((initValue / 3600000000) > 1) {
                    setValue(initValue / 3600000000);
                    setInterval(3600000000);
                }
                else if ((initValue / 60000000) > 1) {
                    setValue(initValue / 60000000);
                    setInterval(60000000);
                }
                else if ((initValue / 1000000) > 1) {
                    setValue(initValue / 1000000);
                    setInterval(1000000)
                }
                else {
                    setValue(1);
                    setInterval(1000000);
                }
                console.log(initValue);
                // return result
            })
            .catch(() => {
                setIsLoading(false);
                // toast.warning('Impossibile recuperare i dati', ToastOptions);
            })

    }

    const saveData = async () => {
        var total = value * +interval;
        var res = await fetch(`${baseUrl}/setSleep?sleeptime=${total}`)
            .then((data) => { });
        console.log(value);
        console.log(interval);
    }

    if (isLoading) {
        return (
            <Loading index="1" />
        )
    }
    else {


        return (
            <div className={`home-panel`} style={{ paddingTop: '1vh' }}>

                <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                    <TextField id="outlined-basic" type="number" value={value} onChange={(e) => { setValue(e.target.value) }} variant="outlined" />

                    <TextField
                        id="outlined-select-interval"
                        select
                        label="Intervallo"
                        value={interval}
                        onChange={(e) => { setInterval(e.target.value) }}
                    >
                        {intervals.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }} style={{ marginTop: '1vh' }}>
                    <Button variant="contained" onClick={saveData}>Salva</Button>
                </Box>
            </div>
        );
    }
}

export default Settings;