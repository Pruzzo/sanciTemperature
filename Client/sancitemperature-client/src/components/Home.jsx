import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import TemperatureChart from './TemperatureChart';
import moment from 'moment';
import { CircularProgress } from '@material-ui/core';

const Home = () => {
    const [chartData, setChartData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    const populateChart = async (from, to) => {
        var values = await getValues(from, to);
        setChartData(values)
    }
    const getValues = async (from, to) => {
        var res = await fetch(`http://localhost:5031/api/v1/temperature/get?from=${from}&to=${to}`).then((data) => data.json()).then((result) => result)
        console.log(res);
        return res;
    }
    useEffect(() => {
        var now = moment.utc();
        var ago24 = moment.utc();
        ago24.add(-1, 'days');
        console.log(now.format());
        console.log(ago24.format());
        populateChart(ago24.format(), now.format());
        setShowLoading(false);
    }, [])

    return (
        <div>
            {showLoading ?
                <div className="loading">
                    <CircularProgress />
                </div> : <></>
            }
            {/* <TemperatureChart data={chartData} /> */}
        </div>

    );
}


export default Home;