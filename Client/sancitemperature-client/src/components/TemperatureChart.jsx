import { Box } from '@mui/system';
import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

// const data = [
//   {
//     name: '10-12-2022',
//     temperatura: 10.9 
//   },
//   {
//     name: '12-12-2022',
//     temperatura: 10.9 
//   }
// ];
class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
          {payload.value}
        </text>
      </g>
    );
  }
}


export default class TemperatureChart extends React.Component {
  CustomLegend = () => {
    return (
      <Box style={{marginTop: "2vh"}} sx={{ display: "flex", justifyContent: "center" }}>
        {
          this.props.index ==1? <h3>Temperatura ultime 24 ore</h3> : 
          this.props.index == 2? <h3>Temperatura ultimi 7 giorni</h3> : 
          this.props.index == 3? <h3>Temperatura ultimo mese</h3> :
          this.props.index == 4? <h3> Temperatura dal {this.props.startDate.format('D-M-YYYY h:mm')} al {this.props.endDate.format('D-M-YYYY h:mm')} </h3> : <></>
        }
      </Box>
    );
  }
  render() {
    return (
      <div width="100%" height="100%" >
        <LineChart width={window.innerWidth - 50} height={400} data={this.props.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 10, right: 30 }} tick={<CustomizedAxisTick />} />
          <YAxis padding={{top: 10}} />
          <Tooltip />
          <Legend verticalAlign="bottom" content={<this.CustomLegend />} />
          <Line type="monotone" dataKey="temperatura" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    );
  }
}