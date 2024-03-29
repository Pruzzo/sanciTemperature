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
import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import SendIcon from '@mui/icons-material/Send';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import DateTimeSelector from './DateTimeSelector';
import dayjs from 'dayjs';
import EventIcon from '@mui/icons-material/Event';
import TodayIcon from '@mui/icons-material/Today';
import TemperatureTable from './TemperaturreTable';
import MinMax from './MinMax';


const Home = () => {
    const baseUrl = `${process.env.REACT_APP_SERVER_URL}api/v1/temperature/get`;
    // const baseUrl = `http://temperaturasanci.azurewebsites.net/api/v1/temperature/get`;
    const [isLoading, setIsLoading] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [reverseChartData, setReverseChartData] = useState([]);
    const [buttonIndex, setButtonIndex] = useState(0);
    const [startDate, setStartDate] = useState(dayjs(moment().format()))
    const [endDate, setEndDate] = useState(dayjs(moment().format()))
    const [maxTemp, setMaxTemp] = useState(0);
    const [minTemp, setMinTemp] = useState(0);

    const populateChart = async (from, to) => {
        var values = await getValues(from, to);
        if (!!values) {
            console.log(values);
            console.log(values.reverse());

            setChartData(values);
            setReverseChartData(values.reverse());
        }
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


    const PageContent = () =>
        <>
            {buttonIndex == 4 ? rangePicker() : <></>}
            <MinMax min={minTemp} max={maxTemp} />
            <TemperatureChart  data={reverseChartData} index={buttonIndex} startDate={startDate} endDate={endDate} />
            {/* <Divider variant="inset" /> */}
            <TemperatureTable data={chartData} />
        </>

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
        var res = await fetch(`${baseUrl}?from=${from}&to=${to}`)
            .then((data) => data.json())
            .then((result) => {
                setIsLoading(false);
                var temperatures = result.map((el) => { return el.temperatura });
                var min = Math.min.apply(Math, temperatures);
                var max = Math.max.apply(Math, temperatures);
                setMinTemp(result[temperatures.indexOf(min)]);
                setMaxTemp(result[temperatures.indexOf(max)]);
                return result
            })
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
        console.log(process.env.REACT_APP_SERVER_URL);
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
            <div className={`home-panel`}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }} className="boxTab">
                    <Button onClick={() => { handleTopClick(1) }} className="topButton" variant="contained" disabled={buttonIndex == 1 ? true : false} startIcon={<HistoryToggleOffIcon />}>24H</Button>
                    <Button onClick={() => { handleTopClick(2) }} className="topButton" variant="contained" disabled={buttonIndex == 2 ? true : false} startIcon={<HistoryToggleOffIcon />}>7 GG</Button>
                    <Button onClick={() => { handleTopClick(3) }} className="topButton" variant="contained" disabled={buttonIndex == 3 ? true : false} startIcon={<HistoryToggleOffIcon />}>1 M</Button>
                    <Button onClick={() => { handleTopClick(4) }} className="topButton" variant="contained" disabled={buttonIndex == 4 ? true : false} endIcon={<EventIcon />} startIcon={<EventRepeatIcon />}></Button>
                </Box>
                {
                    !!chartData && chartData.length > 0 ? <PageContent /> : <h2 style={{ textAlign: "center" }}>Non ci sono dati per il periodo selezionato</h2>

                }

            </div>

        );
    }
}


export default Home;