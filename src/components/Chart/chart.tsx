/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Line from './lineChart';
import PieChart from './pie';
import StackBar from './stackbar';

import { colorPallets } from '../constants';

interface ChartComponentModel {
    type: string;
    data: any;
    valueKeys?: Array<string> | Array<{
        key: string;
        barColor: string;
    }>;
    XYKeys?: Array<string | any>;
    XLables?: Array<string>;
    YLables?: Array<string>;
    layout?: string;
    aspect?: number;
    colors?: Array<string>;
    title?: { xaxis: string, yaxis: string };
    isAxis?: { x: boolean, y: boolean };
    height?: string;
    classes?: string;
    angledTick?: boolean;
    legendStyle?: any;
    chartSliceClick?: Function;
    multiLabel?: string[] | any[];
    strokeWidth?: number;
    background?: string;
    forground?: string;
}

const ChartComponent = ({
    type,
    data,
    XLables = [],
    layout = 'horizontal',
    aspect = 2,
    forground,
    classes = '',
    colors = colorPallets
}: ChartComponentModel) => {

    switch (type) {
        
        case 'stackbar':
            return <StackBar
            data={data} 
            chartheading={XLables[0]} 
            layout={layout} 
            background="#FFF" 
            aspect={aspect} 
            forground={forground}/>;
        case 'line':
            return <Line 
                data={data} 
                xLables={XLables} 
                forground={forground} 
                aspect={aspect}
            />
        case 'pie':
            return <PieChart
                classes={classes} 
                data={data} 
                colors={colors} 
                type={type} 
                XLables={XLables} />;
        default:
            return <></>;
    }
}

export default ChartComponent;
