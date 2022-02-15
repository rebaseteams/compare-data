/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { colorPallets } from '../constants';
  
interface StackBarChartData {
    xAxisData: Array<string>;
    yAxisData: Array<
        {
            name: string;
            data: Array<
                {
                    xData: string;
                    yData: number | string;
                }
            >
        }
    >
  }

interface StackBarInterface {
    data?: StackBarChartData;
    layout?: any;
    background?: any;
    chartheading?: string | Array<string>;
    aspect?: number;
    barsize?: number;
    forground?: string;
}

const StackBar = ({
        data, 
        layout='horizontal', 
        chartheading="Stack Bar Chart",
        aspect=1.5,
        barsize=10,
        forground="#999",

    }: StackBarInterface) => {

    if (aspect > 3 ) {
        aspect = 3;
    }


    if(!data || data.xAxisData.length===0 || data.yAxisData.length===0) {
        return <div className="data-not-found">
            <h4>No data</h4>
        </div>
    }   

    const {result, bars} = dataMapper(data);
    return (
        <div style={{
                width: "100%", 
                height:"100%", 
                background: "", 
                padding:"15px"
            }} 
            className={"stackbar-wrapper"}>

        <h1  className="chart-title" style={{color: forground}}>{chartheading}</h1>
        <ResponsiveContainer width="100%" height="85%" aspect={aspect}>
        <BarChart
          layout={layout}
          data={result}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="1" />
          {layout==="vertical" && <XAxis tick={{ fill: forground }} type="number" domain={[0, 100]}/>}
          {layout==="vertical" && <YAxis tick={{ fill: forground }} type="category" dataKey="name"/>}

          {layout==="horizontal" && <XAxis tick={{ fill: forground }} dataKey="name"/>}
          {layout==="horizontal" && <YAxis tick={{ fill: forground }} />}
          
          <Tooltip />
          <Legend wrapperStyle={{position: 'relative', marginTop: '10px'}}/>
          {bars.map((key, index) => <Bar key={index+key} dataKey={key} barSize={barsize} stackId="a" fill={colorPallets[index+5]}/>) }

        </BarChart>
      </ResponsiveContainer>
        </div>
    );
}

function dataMapper(data: any) {
    const bars: Array<any> = [];
    let result: Array<any> = [];
    result = data.xAxisData.map( (name: string) => {
        const obj = {
            name: name
        }
        data.yAxisData.map( (yEntry: any) => {
            if(!bars.includes(yEntry.name)) {
                bars.push(yEntry.name)
            }
            const xAxis = yEntry.data.find( (x: any) => x.xData === name )
            if (xAxis) {
                obj[yEntry.name as keyof typeof obj] = xAxis.yData;
            }
        })
        return obj;
    })
    return {result, bars};
}

export default StackBar;