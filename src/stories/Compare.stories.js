import React from "react";
import { storiesOf } from "@storybook/react"
import { CompareData } from "../components/compare/Compare";
import {metadata} from '../../testData/metadata'
import {sampledata} from '../../testData/sampledata'

const stories = storiesOf('App test', module);

stories.add('Compare', ()=>{
    return  (<CompareData metaData={metadata} data={sampledata} />)
})