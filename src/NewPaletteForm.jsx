import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import chroma from "chroma-js";

import DragableColorList from "./DragableColorList";

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
  content: {
    flexGrow: 1,
    padding: `10px`,
    height: `calc(100vh - 48px)`,
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
      pickedColor: "#DA3A3A",
      pickedName: "",
      colors: [],
      canAddColor: true,
      newPaletteName: "",
      newPaletteEmoji: "x",
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isNameUnique", (value) => {
      return this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", () => {
      return this.state.colors.every(
        ({ color }) => color !== this.state.pickedColor
      );
    });
    ValidatorForm.addValidationRule("isPaletteNameUnique", () => {
      return this.props.palettes.every(
        ({ paletteName }) => paletteName !== this.state.newpaletteName
      );
    });
    ValidatorForm.addValidationRule("atLeastFiveColors", () => {
      return this.state.colors.length >= 5
    });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  pickColor = (newColor) => {
    this.setState({ pickedColor: newColor.hex });
  };

  addNewColor = () => {
    if (this.state.canAddColor) {
      this.setState((st) => ({
        colors: [...st.colors, { color: st.pickedColor, name: st.pickedName }],
        canAddColor: st.colors.length < 19,
      }));
    } else {
      alert("can't add more than 20 colors");
    }
  };

  removeColor = (colorName) => {
    this.setState((st) => ({ colors: st.colors.filter(({name}) => name !== colorName) }));
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  submitPalette = ()=> {
    console.log("lol ya negm")
  }

  savePalette = ()=> {
    const paletteName = this.state.newPaletteName
    const id = paletteName.toLowerCase().replace(" ", "-")
    const emoji = this.state.newPaletteEmoji
    const colors = this.state.colors
    const palette = {paletteName, id, emoji, colors}
    this.props.savePalette(palette)
  }

  goBack = ()=> {
    this.props.history.goBack()
  }

  render() {
    const { classes } = this.props;
    const { open, pickedColor } = this.state;

    let textColor;
    if (chroma(this.state.pickedColor).luminance() <= 0.08) {
      textColor = "white";
    } else {
      textColor = "black";
    }

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
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <AddToPhotosIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Create A Palette
              </Typography>
              <ValidatorForm onSubmit={this.savePalette} autoComplete="off">
                <TextValidator
                  value={this.state.newPaletteName}
                  name="newPaletteName"
                  label="palette name"
                  onChange={this.handleChange}
                  validators={["required", "isPaletteNameUnique", "atLeastFiveColors"]}
                  errorMessages={["this field is required", "name must be unique", "add at least five colors to the palette"]}
                  />

              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Save
              </Button>
            </ValidatorForm>

              <Button
                variant="contained"
                color="primary"
                onClick={this.submitPalette}
              >
                Save Palette
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.goBack}
              >
                back
              </Button>
          </Toolbar>
        </AppBar>
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
          <Typography variant="h4">Design your palette</Typography>
          <div className="">
              <Button variant="contained" color="secondary">
                Clear Palette
              </Button>

              <Button variant="contained" color="primary">
                Random Color
              </Button>
          </div>
          <ChromePicker color={pickedColor} onChangeComplete={this.pickColor} />
          <ValidatorForm onSubmit={this.addNewColor} autoComplete="off">
            <TextValidator
              name="pickedName"
              value={this.state.pickedName}
              onChange={this.handleChange}
              validators={["required", "isNameUnique", "isColorUnique"]}
              errorMessages={[
                "Enter a name",
                "name must be unique",
                "color must be unique",
              ]}
            />
              <Button
                variant="contained"
                type="submit"
                style={{ background: pickedColor, color: textColor }}
              >
                Add color
              </Button>
          </ValidatorForm>
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
            />
        </main>
      </div>
    );
  }
}
export default withRouter(withStyles(styles, { withTheme: true })(NewPaletteForm));
