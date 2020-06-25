import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider, { range } from "rc-slider";
import "rc-slider/assets/index.css";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import "./styles/Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex",
      open: false,
    };
  }

  handleChange = (evt) => {
    this.setState({ format: evt.target.value, open: true });
    this.props.changeFormat(evt.target.value);
  };

  closeSnackbar = () => {
    this.setState({ open: false });
  };

  render() {
    const { level, changeLevel } = this.props;
    return (
      <header className="Navbar">
        <div className="logo">
          <Link to="/">color picker</Link>
        </div>
        <div className="slider-container">
          <span>level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        </div>
        <div className="select-container">
          <Select value={this.state.format} onChange={this.handleChange}>
            <MenuItem value="hex">HEX</MenuItem>
            <MenuItem value="rgb">RGB</MenuItem>
            <MenuItem value="rgba">RGBA</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={2000}
          message={
            <span>Format changed to {this.state.format.toUpperCase()}</span>
          }
          onClose={this.closeSnackbar}
          action={[
            <IconButton onClick={this.closeSnackbar} color="inherit">
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </header>
    );
  }
}
