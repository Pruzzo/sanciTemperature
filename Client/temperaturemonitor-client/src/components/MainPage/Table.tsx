import React from 'react';
import { DataTable } from 'primereact/datatable';
import { DateTemperature } from '../../Models/DateTemperature';
import { Column } from 'primereact/column';

export interface TableProps {
    temperatures: DateTemperature[]

}

function Table(props: TableProps) {

    const timeRender = (value: DateTemperature) => {
        return value.createdAt.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
    }
    const temperatureRender = (value: DateTemperature) => {
        return value.temperature.toFixed(1);
    }
    const temperatureClassName = (value: DateTemperature) => {
        switch (true) {
            case (value.temperature < 0):
                return 'lessthan0'
            case (value.temperature < 15):
                return 'lessthan15'
            case (value.temperature < 25):
                return 'lessthan25'
            case (value.temperature < 35):
                return 'lessthan35'
            default:
                return "morethan34"
        }
    }
    return (
        <div className='scroll-table'>
            <DataTable showGridlines value={props.temperatures} tableStyle={{ width: '100vw' }}>
                <Column field='createdAt' header='Orario' body={timeRender} bodyStyle={{ textAlign: 'right', width: '50vw' }} headerClassName="rightHeader" />
                <Column field='temperature' bodyClassName={temperatureClassName} bodyStyle={{ fontWeight: 'bold' }} header='Temperatura' body={temperatureRender} />
            </DataTable>
        </div>
    );
}

export default Table;