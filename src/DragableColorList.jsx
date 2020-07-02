import React from 'react'
import uuid from "uuid/dist/v4";

import DragableColorBox from './DragableColorBox'

const DragableColorList = (props) => {
  return (
    <div style={{height: "100%"}}>
{
  props.colors.map((color,index) => (
    <DragableColorBox
      key={uuid()}
      index={index}
      background={color.color}
      name={color.name}
      remover={()=>props.handleRemove(color.name)}
    />
  ))
}
    </div>
  )
}

export default DragableColorList
