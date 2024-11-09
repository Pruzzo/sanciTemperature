import React, { useEffect } from 'react';
import { DateTemperature } from '../../Models/DateTemperature';

export interface MainTopProps {
    temperature?: DateTemperature
}

function MainTop(props: MainTopProps) {


    const getGap = () => {
        console.log(props.temperature?.createdAt)
        if (!!props.temperature?.createdAt) {
            var now = new Date();
            var diffInMs = now.getTime() - props.temperature?.createdAt.getTime();
            let diffInMinutes = Math.floor(diffInMs / 1000 / 60);
            if (diffInMinutes > 60) {
                return props.temperature?.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
            else if (diffInMinutes < 5) return 'pochi minuti fa'
            else return `${diffInMinutes} minuti fa`;
        }
        return ''
    }

    const getTemperatureClass = () => {
        if (!!props.temperature?.temperature) {
            let tp = props.temperature?.temperature;
            switch (true) {
                case (tp < 0): return 'lessthan0';
                case (tp < 15): return 'lessthan25';
                case (tp < 25): return 'lessthan25';
                case (tp < 35): return 'lessthan35';
                default: return 'morethan40'
            }
        }
    }
    return (
        <div className='main-top'>
            <div>

                <div className={`main-top-temperature ${getTemperatureClass()}`}> {props.temperature?.temperature.toFixed(1)}</div>
                <div className='main-top-gap'>{getGap()}</div>
            </div>
        </div>
    );
}

export default MainTop;