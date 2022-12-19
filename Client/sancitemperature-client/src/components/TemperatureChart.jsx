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

export default class TemperatureChart extends PureComponent {
  render() {
    return (
      <div width="100%" height="100%">
        <LineChart width={window.innerWidth - 30} height={400} data={this.props.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperatura" stroke="#8884d8" activeDot={{ r: 8 }} />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </div>
    );
  }
}