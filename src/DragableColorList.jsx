import React, { useEffect, useState } from "react";
import uuid from "uuid/dist/v4";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";

import DragableColorBox from "./DragableColorBox";

const DragableColorList = (props) => {
  const [items, setItems] = useState(props.colors);

  useEffect(() => {
    setItems(props.colors);
  }, [props.colors]);

  function onChange(sourceId, sourceIndex, targetIndex) {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
    props.changeOrder(nextState);
  }
  return (
    <GridContextProvider
      onChange={onChange}
      style={{ height: "600px", width: "100%" }}
    >
      <GridDropZone
        id="items"
        boxesPerRow={5}
        rowHeight={150}
        style={{ height: "600px", width: "100%" }}
      >
        {items.map((color, index) => (
          <GridItem key={uuid()}>
            <DragableColorBox
              key={uuid()}
              index={index}
              background={color.color}
              name={color.name}
              remover={() => props.handleRemove(color.name)}
            />
          </GridItem>
        ))}
      </GridDropZone>
    </GridContextProvider>
  );
};

export default DragableColorList;
