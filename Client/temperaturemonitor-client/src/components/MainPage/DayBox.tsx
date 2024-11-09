import React, { useEffect } from 'react';

export interface DayBoxProps {
    date: Date
    first: boolean
    last: boolean
    hasmore: boolean
    onClick: any
}
function DayBox(props: DayBoxProps) {
    return (
        <div onClick={() => props.onClick(props.first && props.hasmore, props.last && props.hasmore, props.date)} className='day-box'>
            {props.first && props.hasmore ? "<<" : props.last && props.hasmore ? ">>" : new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'short' }).format(props.date)}
        </div>
    );
}

export default DayBox;