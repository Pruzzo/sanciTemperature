import React, { useEffect, useState } from 'react';
import './Main.css';
import DayBox from './DayBox';
export interface MainMiddleProps {
    days: Date[]
}
function MainMiddle(props: MainMiddleProps) {
    const [days, setDays] = useState<Date[]>([])
    const [showDays, setShowDays] = useState<Date[]>([])
    useEffect(() => {
        var ds = props.days.reverse();
        setDays(ds)
        if (props.days.length > 0) {
            let start = 0;
            if (props.days.length >= 4)
                start = props.days.length - 4;
            setShowDays(ds.slice(start, props.days.length))
        }
    }, [props.days])

    const handleClick = (prev: boolean, next: boolean, date: Date) => {

        if (prev || next) {
            let end = days.length;
            let start = 0;
            if (prev) {
                end = days.indexOf(date) + 2;
                start = end - 4 > 0 ? end - 4 : 0;
            }
            if (next) {
                start = days.indexOf(date) - 1;
                console.log(start);
                end = start + 4 > days.length ? days.length : start + 4;
            }

            setShowDays(days.slice(start, end));
        }
    }
    return (
        <div className='main-middle-container'>
            {
                showDays.map(_ => <DayBox
                    date={_}
                    first={showDays.indexOf(_) == 0}
                    last={showDays.indexOf(_) == showDays.length - 1}
                    //TODO finire questa condizione schifo
                    hasmore={
                        showDays.indexOf(_) == 0 && days.indexOf(_) != 0 ? true :
                            showDays.indexOf(_) == showDays.length - 1 && days.indexOf(_) < days.length - 1 ? true : false
                    }
                    onClick={handleClick}
                />)
            }
        </div>
    );
}

export default MainMiddle;