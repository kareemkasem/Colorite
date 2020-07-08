import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

export default class NewPaletteMeta extends Component {
  state = {
    open: false,
    currentContent: "name",
    newPaletteName: "",
    newPaletteEmoji: "",
    snackbarOpen: false,
  };

  componentDidMount = () => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", () => {
      return this.props.palettes.every(
        ({ paletteName }) => paletteName !== this.props.newpaletteName
      );
    });
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleClickOpen = () => {
    if (this.props.colors.length >= 5) {
      this.setState({ open: true });
    } else {
      this.setState({ snackbarOpen: true });
    }
  };

  handleClose = () => {
    this.setState({ open: false, currentContent: "name" });
  };

  closeSnackbar = () => {
    this.setState({ snackbarOpen: false });
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
    const emojiMessage = !!this.state.newPaletteEmoji ? (
      <span
        style={{
          fontSize: "1.5rem",
          margin: "0 5px",
        }}
      >
        {this.state.newPaletteEmoji} picked
      </span>
    ) : (
      ""
    );

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
            validators={["required", "isPaletteNameUnique"]}
            errorMessages={["this field is required", "name must be unique"]}
          />
          <div className="" style={{ alignSelf: "flex-end" }}>
            <DialogActions>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </div>
        </ValidatorForm>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Picker
            set="twitter"
            onSelect={this.addEmoji}
            title="Pick your emoji…"
            emoji="point_up"
            style={{
              alignSelf: "center",
            }}
          />
          <DialogActions style={{ width: "100%", justifySelf: "flex-end" }}>
            {emojiMessage}
            <div>
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
            </div>
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
          <DialogTitle id="form-dialog-title">
            Save Palette{" "}
            <span role="img" aria-label="palette emoji">
              🎨
            </span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              pick a name and emoji for your new create palette
            </DialogContentText>
          </DialogContent>
          {currentContent}
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.state.snackbarOpen}
          autoHideDuration={2000}
          message={<span>the palette must be 5 colors minimum</span>}
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
