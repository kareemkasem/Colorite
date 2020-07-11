import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

import PaletteFormNav from "./PaletteFormNav";
import ColorPicker from "./ColorPicker";
import DragableColorList from "./DragableColorList";

const drawerWidth = 300;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  drawerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContetnt: "strech",
    width: "92%",
    margin: "15px 4%",
  },
  drawerTitle: {
    fontSize: "1.95rem",
  },
  drawerBtns: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    margin: "10px 0",
    "& Button": {
      fontSize: "0.8rem",
    },
  },
  content: {
    flexGrow: 1,
    padding: `0.25rem`,
    height: `calc(100vh - 4rem)`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      snackbarOpen: false,
      colors: this.props.palettes[0].colors,
      canAddColor: true,
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  changeOrder = (newOrder) => {
    this.setState({ colors: newOrder });
  };

  openSnackbar = () => {
    this.setState({ snackbarOpen: true });
  };

  closeSnackbar = () => {
    this.setState({ snackbarOpen: false });
  };

  setColors = (newColors) => {
    this.setState((st) => ({
      colors: newColors,
      canAddColor: st.colors.length < 19,
    }));
  };

  removeColor = (colorName) => {
    this.setState((st) => ({
      colors: st.colors.filter(({ name }) => name !== colorName),
      canAddColor: true,
    }));
  };

  clearPalette = () => {
    this.setState({ colors: [], canAddColor: true });
  };

  savePalette = (newPaletteName, newPaletteEmoji) => {
    const paletteName = newPaletteName;
    const id = paletteName.toLowerCase().replace(" ", "-");
    const emoji = newPaletteEmoji;
    const colors = this.state.colors;
    const palette = { paletteName, id, emoji, colors };
    this.props.savePalette(palette);
    this.props.history.push("/");
  };

  randomColor = () => {
    if (this.state.colors.length < 20) {
      const allColors = this.props.palettes.map((p) => p.colors).flat();
      const randomColor =
        allColors[Math.floor(Math.random() * allColors.length)];
      this.setState((st) => {
        return {
          colors: [...st.colors, randomColor],
          canAddColor: st.colors.length < 19,
        };
      });
    } else {
      this.openSnackbar();
    }
  };

  render() {
    const { classes, palettes } = this.props;
    const { open, colors, canAddColor } = this.state;

    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          savePalette={this.savePalette}
          colors={colors}
          handleDrawerOpen={this.handleDrawerOpen}
          openSnackbar={this.openSnackbar}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.drawerContent}>
            <Typography variant="h4" className={classes.drawerTitle}>
              Design your palette
            </Typography>
            <div className={classes.drawerBtns}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clearPalette}
              >
                Clear Palette
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={this.randomColor}
              >
                Random Color
              </Button>
            </div>
            <ColorPicker
              colors={colors}
              setColors={this.setColors}
              canAddColor={canAddColor}
              openSnackbar={this.openSnackbar}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DragableColorList
            colors={this.state.colors}
            handleRemove={this.removeColor}
            changeOrder={this.changeOrder}
          />
        </main>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.snackbarOpen}
          autoHideDuration={2000}
          message={<span>you can only add up to 20 colors</span>}
          onClose={this.closeSnackbar}
          action={[
            <IconButton onClick={this.closeSnackbar} color="inherit">
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}
export default withRouter(
  withStyles(styles, { withTheme: true })(NewPaletteForm)
);
