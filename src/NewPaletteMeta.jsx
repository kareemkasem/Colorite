import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

export default class NewPaletteMeta extends Component {
  state = {
    open: false,
    currentContent: "name",
    newPaletteName: "",
    newPaletteEmoji: "x",
  };

  componentDidMount = () => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", () => {
      return this.props.palettes.every(
        ({ paletteName }) => paletteName !== this.props.newpaletteName
      );
    });
    ValidatorForm.addValidationRule("atLeastFiveColors", () => {
      return this.props.colors.length >= 5;
    });
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, currentContent: "name" });
  };

  displayEmojiPicker = () => {
    this.setState({ currentContent: "emojiPicker" });
  };

  addEmoji = (emoji) => {
    this.setState({ newPaletteEmoji: emoji.native });
  };

  savePalette = () => {
    const { newPaletteName, newPaletteEmoji } = this.state;
    this.props.savePalette(newPaletteName, newPaletteEmoji);
    this.handleClose();
  };

  render() {
    const currentContent =
      this.state.currentContent === "name" ? (
        <ValidatorForm
          onSubmit={this.displayEmojiPicker}
          autoComplete="off"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextValidator
            style={{ width: "90%" }}
            value={this.state.newPaletteName}
            name="newPaletteName"
            label="palette name"
            onChange={this.handleChange}
            validators={[
              "required",
              "isPaletteNameUnique",
              "atLeastFiveColors",
            ]}
            errorMessages={[
              "this field is required",
              "name must be unique",
              "add at least five colors to the palette",
            ]}
          />
          <DialogActions style={{ alignSelf: "flex-end" }}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </ValidatorForm>
      ) : (
        <div>
          <Picker
            set="twitter"
            onSelect={this.addEmoji}
            title="Pick your emoji…"
            emoji="point_up"
            style={{
              margin: "auto",
            }}
          />
          <DialogActions style={{ alignSelf: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.savePalette}
            >
              Save
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </div>
      );

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          save
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Save Palette 🎨</DialogTitle>
          <DialogContent>
            <DialogContentText>
              pick a name and emoji for your new create palette
            </DialogContentText>
          </DialogContent>
          {currentContent}
        </Dialog>
      </div>
    );
  }
}
