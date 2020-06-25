import React, { Component } from "react";
import { Link } from "react-router-dom";
import seedColors from "./seedColors";

export default class PaletteList extends Component {
  render() {
    const paths = seedColors.map((palette) => {
      return <Link to={`/palette/${palette.id}`}> {palette.paletteName} </Link>;
    });
    return (
      <div style={{ display: "flex", flexDirection: "column", margin: "2rem" }}>
        <h1>Paettes List</h1>
        {paths}
      </div>
    );
  }
}
