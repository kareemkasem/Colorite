import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import chroma from "chroma-js";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "strech",
    width: "100%",
  },
  validatorForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "strech",
    margin: "10px 0",
    "& Button": {
      marginTop: "15px",
    },
  },
};

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedColor: "#DA3A3A",
      pickedName: "",
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isNameUnique", (value) => {
      return this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", () => {
      return this.props.colors.every(
        ({ color }) => color !== this.state.pickedColor
      );
    });
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  pickColor = (newColor) => {
    this.setState({ pickedColor: newColor.hex });
  };

  addNewColor = () => {
    if (this.props.canAddColor) {
      const newColor = {
        color: this.state.pickedColor,
        name: this.state.pickedName,
      };
      this.props.setColors([...this.props.colors, newColor]);
    } else {
      this.props.openSnackbar();
    }
  };

  render() {
    const { classes } = this.props;
    const { pickedColor, pickedName } = this.state;
    let textColor;
    if (chroma(pickedColor).luminance() <= 0.08) {
      textColor = "white";
    } else {
      textColor = "black";
    }
    return (
      <div className={classes.root}>
        <ChromePicker
          color={pickedColor}
          onChangeComplete={this.pickColor}
          className={classes.chromePicker}
          width="100%"
        />
        <ValidatorForm
          onSubmit={this.addNewColor}
          autoComplete="off"
          className={classes.validatorForm}
        >
          <TextValidator
            name="pickedName"
            value={pickedName}
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
      </div>
    );
  }
}

export default withStyles(styles)(ColorPicker);
