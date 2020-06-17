import React, { Component } from "react";
import uuid from "uuid/dist/v4";
import "./styles/Pallete.css";
import ColorBox from "./ColorBox";

export default class Palette extends Component {
  render() {
    const colorBoxes = this.props.colors.map((c) => (
      <ColorBox background={c.color} name={c.name} key={uuid()}/>
    ));
    return (
      <div className="Palette">
        {/* headr */}
        <div className="palette-colors">{colorBoxes}</div>
        {/* footer */}
      </div>
    );
  }
}
