/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import _ from 'lodash';
// UTILS

// COMPONENTS
import ChartComponent from '../Chart/chart';
// STYLES
import { Col, Row } from 'antd';
import { chartObj } from '../../types/chartObj';
import { section } from '../../types/section';
import { CompareDataProps } from '../../types/props';
import RadarChart from '../Chart/radar';


const ComparisionChartComponent = ({functionMapper, metaData, data}: CompareDataProps) => {
    
    return (<div>
        {
            metaData.map((section: section, index: number) => (<div key={index} className="section">
                <div className='section-header'>
                    <h3 className='text-center'>{ section.name }</h3>
                    <h5 className='text-center'>{ section.description }</h5>
                </div>

                <div className='chart-section'>
                    <Row style={{width: '100%'}} gutter={10}>
                    {
                        section.data.map((chartObj: chartObj, chartIndex: number) => render(functionMapper, data, chartObj, chartIndex))
                    }
                    </Row>       
                </div>
                
            </div>))
        }
    </div>
    );

};

function render(functionMapper: any, data: any, chartObj: chartObj, chartIndex: number) {
    if (functionMapper[chartObj.mapperFunctionName]) {
        const chartsData: any = functionMapper[chartObj.mapperFunctionName](chartObj, data);
        return _.map(chartsData, (chartData, chartKey) => (
            <Col key={chartKey} sm={{span:chartData.width}} xs={{span: 24}} offset={chartData.offset || 0}>
                <div className={'chart'}>
                { selectChart(chartData.data, chartObj, chartIndex, chartKey, chartData.aspect) }
                </div>
            </Col>
        ));
    }

    return <div></div>
}

function selectChart(chartData: any, chartObj: any, chartIndex: number, chartKey: string, aspect: any) {
    switch (chartObj.type) {
        
        case 'stackbar':
            return <ChartComponent key={chartIndex+chartKey}
                data={chartData}
                type={"stackbar"}
                XLables={[chartObj.name]}
                layout="vertical"
                aspect={aspect}
                />
        case 'line':
            return (
                <ChartComponent
                key={chartIndex + chartKey}
                data={chartData}
                type="line"
                XLables={[chartObj.name]}
                />
            );
        case 'pie':
            return <ChartComponent key={chartIndex+chartKey}
                data={chartData.data}
                type={"pie"}
                XLables={[chartData.headerName]}
            />
        case 'radar':
            return <RadarChart key={chartIndex+chartKey} 
                altColor={chartData.altColor} 
                data={chartData.data} 
                headerName={chartData.headerName}/>
    }
    return <div>No Data</div>
}

export default ComparisionChartComponent;