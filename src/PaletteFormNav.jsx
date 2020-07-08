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
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";

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
      marginRight: "5px",
    },
  },
});

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPaletteName: "",
      newPaletteEmoji: "x",
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", () => {
      return this.props.palettes.every(
        ({ paletteName }) => paletteName !== this.state.newpaletteName
      );
    });
    ValidatorForm.addValidationRule("atLeastFiveColors", () => {
      return this.props.colors.length >= 5;
    });
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  savePalette = () => {
    this.props.savePalette(
      this.state.newPaletteName,
      this.state.stnewPaletteEmoji
    );
  };

  submitPalette = () => {
    console.log("lol ya negm");
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
            <Button
              variant="contained"
              color="primary"
              onClick={this.submitPalette}
            >
              Save Palette
            </Button>
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

// const nextForm = (
//   <ValidatorForm onSubmit={this.savePalette} autoComplete="off">
//     <TextValidator
//       value={this.state.newPaletteName}
//       name="newPaletteName"
//       label="palette name"
//       onChange={this.handleChange}
//       validators={["required", "isPaletteNameUnique", "atLeastFiveColors"]}
//       errorMessages={[
//         "this field is required",
//         "name must be unique",
//         "add at least five colors to the palette",
//       ]}
//     />

//     <Button variant="contained" color="primary" type="submit">
//       Save
//     </Button>
//   </ValidatorForm>
// );
