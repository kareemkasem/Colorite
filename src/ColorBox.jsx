import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./styles/ColorBox.css";

export default class ColorBox extends Component {
  render() {
    const { name, background } = this.props;
    return (
      <CopyToClipboard text={background} >
       <div className="ColorBox" style={{ background }}>
        <div className="box-container">
          <div className="box-content">
            <span>{name}</span>
          </div>
          <button className="copy-btn">copy</button>
        </div>
        <span className="see-more">more</span>
       </div>
      </CopyToClipboard>
    );
  }
}
