import React from "react";
import { storiesOf } from "@storybook/react"
import { Base } from "../components/base/Base";


const stories = storiesOf('App test', module);

stories.add('App', ()=>{
    return  (<Base />)
})