import React from "react";
import { storiesOf } from "@storybook/react"
import { CompareData } from "../components/compare/Compare";
import {metadata} from '../utils/metadata' 
import {sampledata} from '../utils/sampledata'

const stories = storiesOf('App test', module);

stories.add('Compare', ()=>{
    return  (<CompareData metaData={metadata} data={sampledata} />)
})