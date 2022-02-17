import React from 'react';
import { Radar, RadarConfig } from '@ant-design/charts';
import _ from 'lodash';

interface RadarChartProps {
    headerName : string,
    data : {
        name : string,
        value : number
    }[],
    altColor : string
}

const RadarChart = ({
  headerName,
  data,
  altColor,
}: RadarChartProps) => {
  if (!headerName) return <div>No Header Name</div>;

  data = _(data).map((val) => (val.value > 0 ? val : null)).compact().value();

  if (data.length < 1) return <div>No Data</div>;
  const config: RadarConfig = {
    yAxis: {
      label: false,
      grid: {
        alternateColor: [null, altColor],
      },
    },
    autoFit: true,
    data,
    xField: 'name',
    yField: 'value',
    meta: {
      value: {
        min: 0,
        max: 100,
      },
    },
    lineStyle: {
      fill: 'white',
      fillOpacity: 0.2,
      stroke: 'white',
      lineWidth: 2,
    },
    area: {},
    legend: false,
  };
  return (
    <div>
      <div className="radarHeader">
        {headerName}
      </div>
      <Radar
        yAxis={config.yAxis}
        autoFit={config.autoFit}
        data={config.data}
        xField={config.xField}
        yField={config.yField}
        meta={config.meta}
        lineStyle={config.lineStyle}
        legend={config.legend}
        area={config.area}
        point={config.point}
        tooltip={config.tooltip}
      />
    </div>
  );
};

export default RadarChart;
