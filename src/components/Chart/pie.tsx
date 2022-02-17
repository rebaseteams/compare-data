/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import _ from 'lodash';

interface PieChartProps {
    type: any;
    data: {
        label: string;
        value: number;
    }[];
    colors: string[];
    classes: string;
    XLables?: Array<string>
    forground?: string;
    background?: string;
}

const PieChart = ({
  type,
  data,
  colors,
  classes,
  XLables=["Pie Chart"],
  forground="#FFF",
  background="#000"
}: PieChartProps) => {
  if(!data || data.length===0) {
    return <div className="data-not-found">
    <h4>No data</h4>
  </div>
  }
  const [donutValues, setDonutValues] = useState<Array<number>>([]);
  const [options, setOptions]: any = useState({
    legend: {
      show: false,
      fontSize: '12px',
      position: "bottom",
      labels: {
        colors: "#FFF",
        useSeriesColors: false
    }
    },
    chart: {
      type: 'donut',
    },
    dataLabels: {
      enabled: true,
    }
  });

  useEffect(() => {
    const values = _.map(data, 'value');
    const labels = _.map(data, 'label');
    setDonutValues(values);

    colors = colors.slice(2,colors.length-1);
    setOptions({
      ...options,
      ...(labels.length > 0 && {
        legend: {
          show: true,
          customLegendItems: labels,
          markers: {
            fillColors: colors,
          },
        },
      }),
      ...(labels.length > 0 && {
        tooltip: {
          style: {
            padding: '10px',
          },
          custom({ series, seriesIndex }) {
            return `<div style="padding: 5px 15px">${labels[seriesIndex]}: ${series[seriesIndex]}</div>`;
          },
        },
      }),
      ...(colors.length > 0 && {
        fill: {
          colors,
        },
      }),
    });
    // }
  }, [data]);
  return (
    <div className={`chart-wrapper ${classes}`} style={{background: background}}>
      <p className='chart-title' style={{color: forground}}>{XLables[0]}</p>
      <Chart
        options={options}
        series={donutValues}
        type={type}
      />
    </div>
  );
};

export default PieChart;
