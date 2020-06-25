import React, { Component } from "react";
import uuid from "uuid/dist/v4";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./styles/Pallete.css";

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format: "hex",
    };
  }

  changeLevel = (level) => {
    this.setState({ level });
  };

  changeFormat = (val) => {
    this.setState({ format: val });
  };

  render() {
    const { level, format } = this.state;
    const { colors, paletteName, emoji } = this.props.palette;

    const colorBoxes = colors[level].map((c) => (
      <ColorBox background={c[format]} name={c.name} key={uuid()} />
    ));
    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          changeFormat={this.changeFormat}
        />
        <div className="palette-colors">{colorBoxes}</div>
        <footer className="palette-footer">
          {paletteName}
          <span className="footer-emoji">{emoji}</span>
        </footer>
      </div>
    );
  }
}
