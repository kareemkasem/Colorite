import React from "react";
import { withStyles } from "@material-ui/styles";
import chroma from "chroma-js";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";


const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    padding: "0",
    marginBottom: "-5px",
    display: "inline-block",
    position: "relative",
    cursor: "grab",
    textTransform: "uppercase",
    overflow: "hidden",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: "calc(100% - 10px)",
    height: "20px",
    lineHeight: "0",
    right: "10px",
    bottom: "10px",
    font: '"roboto", sans-serif',
    size: "1rem",
    fontWeight: "400",
    userSelect:"none"
  },
};

const DragableColorBox = (props)=> {
  let textColor;
  if (chroma(props.background).luminance() <= 0.08){
    textColor = "white"
  } else {
    textColor= "dark"
  }


  let name;
  if(props.name.length > 15){
    name = props.name.substr(0,16) + "..."
  }else{
    name = props.name
  }

  return (
    <div
      className={props.classes.root}
      style={{ background: props.background }}
    >
      <div className={props.classes.content} onClick={props.remover}>
        <IconButton>
          <DeleteIcon style={{color: textColor}} />
        </IconButton>
        <p style={{color: textColor}}>{name}</p>
      </div>
    </div>
  );
}
export default withStyles(styles)(DragableColorBox);
