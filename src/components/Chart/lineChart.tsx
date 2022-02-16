/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
    LineChart, Line as Lino, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  } from 'recharts';
  
  //colors
  import { colorPallets } from '../constants';
  
  export interface LineChartModel {
    xAxisData: Array<string>;
    yAxisData: Array<LineData>;
  }
  
  interface LineChartProp {
      data: LineChartModel;
      xLables? : string[];
      width?: string | number;
      color?: string[];
      strokeWidth?: number;
      forground?: string;
      background?: string;
      aspect?: number;
  }
  
  interface LineData {
    name: string;
    data: Array<{ xAxis: string, yAxis: number }>;
  }
  
  const Line = ({ 
    data,
    xLables = ["Line Chart"],
    width = '100%',
    strokeWidth=4,
    forground="#111",
    background="#FFF",
    aspect=2
  }: LineChartProp) => {
  
    let combinedData: Array<any>;
  
    if ( data.xAxisData.length ===  0 || data.yAxisData.length === 0 ) {
      return <div className="data-not-found">
        <h4>No data</h4>
      </div>
    }
    else {
      // line data mapping logic
      combinedData = data.xAxisData.map((entry) => {
        const res: any = {
          xAxis: entry,
        };
        data.yAxisData.map((yEntry) => {
          const data = yEntry.data.find((x) => x.xAxis === entry);
          if (data) {
            res[yEntry.name] = data.yAxis;
          }
        });
        return res;
      });
    
      //rendering of line chart
      return (
        <div style={{background: background}} className="lineChart-wrapper">
          <p className='chart-title' style={{color: forground}}>{xLables[0]}</p>
          <ResponsiveContainer width={width} aspect={aspect}>
          <LineChart
            data={combinedData}
            margin={{
              top: 5,
              right: 5,
              left: 10,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={{ fill: forground }} dataKey="xAxis" minTickGap={combinedData.length/6} angle={-45} markerHeight={10} dy={25} />
            <YAxis tick={{ fill: forground }}/>
            <Tooltip />
            {
              data.yAxisData.map((yData, index) => <Lino strokeWidth={strokeWidth} type="monotone" key={index} dataKey={yData.name} stroke={colorPallets[index+4]} dot={false} />)
            }
            <Legend 
              wrapperStyle={{ bottom: 'unset', marginTop: 0, marginBottom: 10 }}
              verticalAlign={"bottom"} height={30} margin={{top:80}}/>
          </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }
  };
  
  export default Line;
  