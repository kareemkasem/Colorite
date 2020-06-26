import React from "react";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    background: "#F5F5F5",
    borderRadius: "10px",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "0px 0px 8px 1px rgba(161,152,161,0.5)",
      transform: "scale(1.04)",
    },
  },
  smallBox: {
    width: "40px",
    height: "40px",
  },
  colors: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(4, 1fr)",
    width: "fit-content",
    padding: "0.5rem",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "0.5rem",
    fontSize: "1rem",
    lineHeight: "0",
    fontWeight: "500",
  },
};

function MiniPalette(props) {
  const { classes, paletteName, id, emoji, colors } = props;
  const colorGrid = colors.map((c) => (
    <div className={classes.smallBox} style={{ background: c.color }}></div>
  ));

  const goToPalette = () => props.history.push(`/palette/${id}`);

  return (
    <div className={classes.root} onClick={goToPalette}>
      <div className={classes.colors}>{colorGrid}</div>
      <div className={classes.footer}>
        <p>{paletteName}</p>
        <p>{emoji}</p>
      </div>
    </div>
  );
}

export default withRouter(withStyles(styles)(MiniPalette));
