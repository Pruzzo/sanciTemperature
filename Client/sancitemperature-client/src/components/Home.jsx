import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import TemperatureChart from './TemperatureChart';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import Loading from './Loading';
import { ToastOptions } from '../utils/Constants';
import { toast } from 'react-toastify';
import { Box } from '@mui/system';
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import SendIcon from '@mui/icons-material/Send';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import DateTimeSelector from './DateTimeSelector';
import dayjs from 'dayjs';
import EventIcon from '@mui/icons-material/Event';
import TodayIcon from '@mui/icons-material/Today';
import TemperatureTable from './TemperaturreTable';


const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [buttonIndex, setButtonIndex] = useState(0);
    const [startDate, setStartDate] = useState(dayjs(moment().format()))
    const [endDate, setEndDate] = useState(dayjs(moment().format()))

    const populateChart = async (from, to) => {
        var values = await getValues(from, to);
        setChartData(values)
    }
    const rangePicker = () =>
        <Box className="range-picker">
            <Grid container spacing={0}>
                <Grid xs={6} sx={{ display: "flex", justifyContent: 'flex-end' }} style={{ paddingRight: "1vw" }}>

                    <DateTimeSelector title="Inizio" valueAccessor={[startDate, setStartDate]} />
                </Grid>
                <Grid xs={6} sx={{ display: "flex", justifyContent: 'flex-start' }} style={{ paddingLeft: "1vw" }}>

                    <DateTimeSelector title="Fine" valueAccessor={[endDate, setEndDate]} />
                </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: 'center' }} style={{ marginTop: "2vh" }}>
                <Button onClick={() => customTimeWindow()} variant='contained' >Invia</Button>
            </Box>
        </Box>
    const handleTopClick = (value) => {
        setButtonIndex(value);
        switch (value) {
            case 1:
                last24Hrs();
                break;
            case 2:
                last7Days();
                break;
            case 3:
                lastMonth();
                break;
            case 4:
                break;
            default:
                toast.warning("scelta non valida", ToastOptions);
        }
    }

    const getValues = async (from, to) => {
        setIsLoading(true);
        var res = await fetch(`http://localhost:5031/api/v1/temperature/get?from=${from}&to=${to}`)
            .then((data) => data.json())
            .then((result) => { setIsLoading(false); return result })
            .catch(() => {
                setIsLoading(false);
                toast.warning('Impossibile recuperare i dati', ToastOptions);
            })
        console.log(res);
        return res;
    }

    const last24Hrs = async () => {
        var now = moment.utc();
        var past = moment.utc();
        past.add(-1, 'days');
        await populateChart(past.format(), now.format());
    }
    const last7Days = async () => {
        var now = moment.utc();
        var past = moment.utc();
        past.add(-7, 'days');
        await populateChart(past.format(), now.format());
    }
    const lastMonth = async () => {
        var now = moment.utc();
        var past = moment.utc();
        past.add(-1, 'month');
        await populateChart(past.format(), now.format());
    }
    const customTimeWindow = async () => {
        await populateChart(moment.utc(startDate.format()).format(), moment.utc(endDate.format()).format())
    }
    useEffect(() => {
        setButtonIndex(1);
        last24Hrs();
    }, [])
    if (isLoading) {
        return (
            <Loading index="1" />
        )
    }
    else {

        return (
            <div className='home-panel'>
                <Box sx={{ display: 'flex', justifyContent: 'center' }} className="boxTab">
                    <Button onClick={() => { handleTopClick(1) }} className="topButton" variant="contained" disabled={buttonIndex == 1 ? true : false} startIcon={<HistoryToggleOffIcon />}>24H</Button>
                    <Button onClick={() => { handleTopClick(2) }} className="topButton" variant="contained" disabled={buttonIndex == 2 ? true : false} startIcon={<HistoryToggleOffIcon />}>7 GG</Button>
                    <Button onClick={() => { handleTopClick(3) }} className="topButton" variant="contained" disabled={buttonIndex == 3 ? true : false} startIcon={<HistoryToggleOffIcon />}>1 M</Button>
                    <Button onClick={() => { handleTopClick(4) }} className="topButton" variant="contained" disabled={buttonIndex == 4 ? true : false} endIcon={<EventIcon />} startIcon={<EventRepeatIcon />}></Button>
                </Box>
                {buttonIndex == 4 ? rangePicker() : <></>}
                <TemperatureChart data={chartData} />
                <TemperatureTable data={chartData} />

            </div>

        );
    }
}


export default Home;