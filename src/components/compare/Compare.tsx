/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { CompareDataProps } from '../../types/props';

import ComparisionChartComponent from '../ComparisionChart'

export const CompareData=({functionMapper, metaData, data}: CompareDataProps)=>{

    return (
        <div>
            <ComparisionChartComponent functionMapper={functionMapper} metaData={metaData} data={data} />
        </div>
    )
}