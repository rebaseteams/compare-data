/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { chartObj } from '../src/types/chartObj';

interface StackBarChartData {
  xAxisData: Array<string>;
  yAxisData:
    | Array<{
        name: string;
        data: Array<{
          xData: string;
          yData: number | string;
        }>;
      }>
    | any;
}

export interface StackBarInterface {
  data?: StackBarChartData;
  layout?: unknown;
  background?: unknown;
  chartheading?: string | Array<string>;
}

const mapper = {
  a18_29: '18-29',
  a30_44: '30-44',
  a45_60: '45-60',
  a60_plus: '60+',
  k_25_50: '25-50k',
  k_50_100: '50-100k',
  k_100_150: '100-150k',
  k_150_plus: '150k Plus',
  k_under_25: 'Under 25k',
  male: 'Male',
  female: 'Female',
  bachelor_degree: 'Bachelor',
  graduate_degree: 'Graduation',
  high_school_degree: 'High School',
  less_than_high_school_degree: 'Less than high school',
  some_college_or_associate_degree: 'Some College/ Assosciate',
};

// ---Functions for data mapping of Demographic data---
// Stack Bar Chart Mapper starts
export const DemographicsStackAgeGetter = (chartObj: chartObj, data: any) => demographicsStackGetter(data, chartObj, 'age');
export const FollowersSpotifyGetter = (chartObj: chartObj, data: any) => followesGetter(data, chartObj, 'spotify');
export const EducationGetter = (chartObj: chartObj, data: any) => educationPersonalityGetter(data, chartObj, 'education');


function demographicsStackGetter(data: any, chartObj: chartObj, prop: string) {
  const result: StackBarChartData = {
    xAxisData: [],
    yAxisData: [],
  };
  let mapperObj: any;
  data.forEach((artist: any) => {
    if (artist.demographics[prop]) {
      mapperObj = artist;
      return false;
    }
    return null;
  });
  if (!mapperObj) {
    return [{ data: result, width: 8, aspect: 4 / data.length }];
  }
  _.map(mapperObj.demographics[prop], (propValue, propKey) => {
    const res: {
      name:string;
      data: Array<{
        xData:string;
        yData:string;
      }>
    } = {
      name: '',
      data: [],
    };
    const mapperValue = mapper[propKey as keyof typeof mapper] || propKey;
    res.name = mapperValue;

    data.forEach((artists: any) => {
      if (!result.xAxisData.includes(artists.name)) {
        result.xAxisData.push(artists.name);
      }
      if (
        artists.demographics[prop] && artists.demographics[prop][propKey]
      ) {
        res.data.push({
          xData: artists.name,
          yData: artists.demographics[prop][propKey],
        });
      }
    });
    result.yAxisData.push(res);
  });
  return [{ data: result, width: 8, aspect: 4 / data.length }];
}

// Stack bar chart mapper ends

function followesGetter(data: any, chartObj: chartObj, socialMedia: string) {
  const result:{
    xAxisData: Array<any>;
    yAxisData: Array<any>;
  } = {
    xAxisData: [],
    yAxisData: [],
  };

  data.forEach((artist) => {
    _.map(artist.total_followers[socialMedia], (obj: any) => {
      if (!result.xAxisData.includes(obj.date)) {
        result.xAxisData.push(obj.date);
      }

      if (!result.yAxisData.find((obj) => obj.name === artist.name)) {
        result.yAxisData.push({ name: artist.name, data: [] });
      }

      const objToUpdate = result.yAxisData.find(
        (obj) => obj.name === artist.name,
      );
      objToUpdate.data.push({
        xAxis: obj.date,
        yAxis: obj.value,
      });
    });

    result.xAxisData.sort();
  });

  return [{ data: result, width: 8, aspect: 1.5 }];
} 

function educationPersonalityGetter(data: any, chartObj: chartObj, prop: string) {
  const artistTraitCharts = data.map((artist) => {
    const finalResult = {
      data: {
        headerName: artist.name,
        name: chartObj.name,
        data: _.map(artist.demographics[prop], (value, key) => {
          const label = mapper[key] || key;
          return { label, value: Number(value) };
        }),
      },
      width: data.length > 1 ? Number(24 / data.length) : 12,
      offset: data.length > 1 ? 0 : 6,
      aspect: 1.5,
    };
    return finalResult;
  });

  return artistTraitCharts;
}
