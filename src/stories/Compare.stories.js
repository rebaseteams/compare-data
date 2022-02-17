import React from "react";
import { storiesOf } from "@storybook/react"
import {metadata} from '../../testData/metadata'
import {sampledata} from '../../testData/sampledata'
import {CompareData} from '../index'
import * as functionMapper from '../../testData/functionMapper'

const stories = storiesOf('App test', module);

const cmp = new CompareData(functionMapper)

stories.add('Compare', ()=>{
    return  (cmp.compare(metadata, sampledata))
})