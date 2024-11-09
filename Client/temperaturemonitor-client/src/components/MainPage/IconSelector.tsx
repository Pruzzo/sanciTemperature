import React from 'react';
import { IconContext } from 'react-icons';
import { TbChartLine, TbTableColumn } from "react-icons/tb";
import { MainPageScope } from './MainPage';

export interface IconSelectorProps {
    scope: MainPageScope
    onClick: any
}

function IconSelector(props: IconSelectorProps) {
    return (
        <IconContext.Provider value={{ size: "2rem" }}>

            <div className='icon-selector'>
                {props.scope == MainPageScope.Graph ?
                    <TbTableColumn onClick={props.onClick} /> :
                    <TbChartLine onClick={props.onClick} />
                }
            </div>
        </IconContext.Provider>
    );
}

export default IconSelector;