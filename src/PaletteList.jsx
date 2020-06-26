import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import seedColors from "./seedColors";
import listBackground from "./assets/listBackground.jpg";

import MiniPalette from "./MiniPalette";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage: `url(${listBackground})`,
    paddingBottom: "2rem",
  },
  header: {
    display: "flex",
    justifyContent: "start",
    "& h1": {
      color: "white",
      textShadow: "0px 0px 6px #777777",
    },
  },
  palettes: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: "1.5rem",
  },
};

class PaletteList extends Component {
  render() {
    const { classes } = this.props;
    const paths = seedColors.map((palette) => {
      return <MiniPalette {...palette} />;
    });
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <div className={classes.header}>
            <h1>Palettes List</h1>
          </div>
          <div className={classes.palettes}>{paths}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
