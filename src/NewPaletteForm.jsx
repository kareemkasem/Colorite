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

import DragableColorBox from "./DragableColorBox";

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
    padding: `5px`,
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

  removeColor = (color) => {
    this.setState((st) => ({ colors: st.colors.filter((c) => c !== color) }));
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  savePalette = ()=> {
    const paletteName = "hardcoded name"
    const id = paletteName.toLocaleLowerCase().replace(" ", "-")
    const emoji = "🧪"
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

    const colorBoxes = this.state.colors.map((color) => (
      <DragableColorBox
        background={color.color}
        name={color.name}
        remover={() => this.removeColor(color)}
      />
    ));

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
            <div className="left-btns">
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
            </div>

            <div className="right-btns">
              <Button
                variant="contained"
                color="primary"
                onClick={this.savePalette}
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
            </div>
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
            <IconButton>
              <Button variant="contained" color="secondary">
                Clear Palette
              </Button>
            </IconButton>
            <IconButton>
              <Button variant="contained" color="primary">
                Random Color
              </Button>
            </IconButton>
          </div>
          <ChromePicker color={pickedColor} onChangeComplete={this.pickColor} />
          <ValidatorForm onSubmit={this.addNewColor}>
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
            <IconButton>
              <Button
                variant="contained"
                type="submit"
                style={{ background: pickedColor, color: textColor }}
              >
                Add color
              </Button>
            </IconButton>
          </ValidatorForm>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {colorBoxes}
        </main>
      </div>
    );
  }
}
export default withRouter(withStyles(styles, { withTheme: true })(NewPaletteForm));
