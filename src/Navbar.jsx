import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./styles/Navbar.css";

class Navbar extends Component {
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

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { level, changeLevel,title } = this.props;
    return (
      <header className="Navbar">
        <div className="logo">
          <ArrowBackIosIcon
            onClick={this.goBack}
            style={{ cursor: "pointer" }}
          />
          <p>{title}</p>
        </div>
        {this.props.showSlider && (
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
        )}
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

export default withRouter(Navbar);
