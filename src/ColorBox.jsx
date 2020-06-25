import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./styles/ColorBox.css";

export default class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
  }

  showOverlay = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  };

  render() {
    const { name, background } = this.props;
    const overlayClass = `copy-overlay ${this.state.copied ? "show" : ""}`;
    const overlayMsgClass = `copy-msg ${this.state.copied ? "show" : ""}`;
    return (
      <CopyToClipboard text={background} onCopy={this.showOverlay}>
        <div className="ColorBox" style={{ background }}>
          {/* divs for the overlay */}
          <div className={overlayClass} style={{ background }} />
          <div className={overlayMsgClass}>
            <h1>copied</h1>
            <p>{background}</p>
          </div>
          {/* original divs */}
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
