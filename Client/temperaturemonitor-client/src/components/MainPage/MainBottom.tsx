import React, { useEffect, useState } from 'react';
import { DateTemperature } from '../../Models/DateTemperature';
import Chart from './Chart';
import { MainPageScope } from './MainPage';
import Table from './Table';

export interface MainBottomProps {
    temperatures: DateTemperature[]
    scope: MainPageScope
}

function MainBottom(props: MainBottomProps) {
    const [chartTemperatures, setChartTemperatures] = useState<DateTemperature[]>([]);

    useEffect(() => {
        chartTs();
    }, [props.temperatures])

    const chartTs = () => {
        console.log(props.temperatures);
        if (props.temperatures.length > 0) {
            console.log(props.temperatures[0].createdAt)
            let start = new Date(props.temperatures[0].createdAt.setHours(0, 0, 0));
            console.log(start);
        }
    }

    return (
        props.scope == MainPageScope.Graph ?

            <Chart temperatures={props.temperatures} />
            : <Table temperatures={props.temperatures} />
    );
}

export default MainBottom;