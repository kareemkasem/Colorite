import React, { Component } from "react";
import uuid from "uuid/dist/v4";
import "./styles/Pallete.css";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
    const { colors, id } = this.props.palette;

    const colorBoxes = colors[level].map((c) => (
      <ColorBox
        background={c[format]}
        name={c.name}
        moreUrl={`${id}/${c.id}`}
        key={uuid()}
        seeMoreLink
      />
    ));
    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          changeFormat={this.changeFormat}
          title="color picker"
          showSlider
        />
        <div className="palette-colors">{colorBoxes}</div>
        <Footer {...this.props.pallette}/>
      </div>
    );
  }
}
