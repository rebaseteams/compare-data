/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { CompareDataProps } from '../../types/props';

import ComparisionChartComponent from '../ComparisionChart'

export const CompareData=({metaData, data}: CompareDataProps)=>{

    return (
        <div>
            <ComparisionChartComponent metaData={metaData} data={data} />
        </div>
    )
}