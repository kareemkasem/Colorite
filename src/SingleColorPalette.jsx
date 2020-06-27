// !#$&()
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import uuid from "uuid/dist/v4";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer"


class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shades: this.fetchShades(),
      format: "hex",
    };
  }

  fetchShades = () => {
    const shades = [];
    const paletteColors = this.props.palette.colors;
    const colorId = this.props.match.params.colorId;
    for (let shade in paletteColors) {
      const desiredColor = paletteColors[shade].filter(
        (color) => color.id === colorId
      )[0];
      shades.push(desiredColor);
    }
    return shades.slice(1);
  };

  changeFormat = (val) => {
    this.setState({ format: val });
  };

  render() {
    const shades = this.state.shades
    const colorBoxes = shades.map((shade) => (
      <ColorBox
        background={shade[this.state.format]}
        name={shade.name}
        key={uuid()}
        seeMoreLink={false}
      />
    ));
    return (
      <div className="SingleColorPalette Palette">
        <Navbar
        changeFormat={this.changeFormat}
        title="shade picker"
        showSlider={false}
        />
        <div className="palette-colors">
        {colorBoxes}
        <ColorBox
          background={`linear-gradient(180deg, ${shades[1].hex} , ${shades[8].hex})`}
          name="gradient(hex)"
          key={uuid()}
          seeMoreLink={false}
        />
        </div>
        <Footer {...this.props.palette} />
      </div>
    );
  }
}

export default withRouter(SingleColorPalette);
