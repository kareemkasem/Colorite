import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import NewPaletteMeta from "./NewPaletteMeta";

const drawerWidth = 300;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    height: "3.5rem",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  navbarBtns: {
    display: "flex",
    alignItems: "center",
    "& button": {
      margin: "0 5px",
    },
  },
});

class PaletteFormNav extends Component {
  savePalette = (name, emoji) => {
    this.props.savePalette(name, emoji);
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { classes, open } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <AddToPhotosIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Create A Palette
            </Typography>
          </Toolbar>
          <div className={classes.navbarBtns}>
            <NewPaletteMeta
              palettes={this.props.palettes}
              colors={this.props.colors}
              savePalette={this.props.savePalette}
            />
            <Button variant="contained" color="secondary" onClick={this.goBack}>
              back
            </Button>
          </div>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(PaletteFormNav));
