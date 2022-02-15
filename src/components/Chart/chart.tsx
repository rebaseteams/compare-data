/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import StackBar from './stackbar';

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
    forground
}: ChartComponentModel) => {

    switch (type) {
        
        case 'stackbar':
            return <StackBar data={data} chartheading={XLables[0]} layout={layout} background="#FFF" aspect={aspect} forground={forground}/>;

        default:
            return <></>;
    }
}

export default ChartComponent;
