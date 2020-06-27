import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";
import "./styles/ColorBox.css";

class ColorBox extends Component {
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

  seeMore = (e) => {
    this.props.history.push(this.props.moreUrl);
    e.stopPropagation();
  };

  render() {
    const { name, background, seeMoreLink } = this.props;
    const overlayClass = `copy-overlay ${this.state.copied ? "show" : ""}`;
    const overlayMsgClass = `copy-msg ${this.state.copied ? "show" : ""}`;
    const isDarkColor = background.substr(0,6) === "linear" ? true : chroma(background).luminance() <= 0.08;
    const isLightColor = background.substr(0,6) === "linear" ? false : chroma(background).luminance() >= 0.6;
    return (
      <CopyToClipboard text={background} onCopy={this.showOverlay}>
        <div className="ColorBox" style={{ background }}>
          {/* divs for the overlay */}
          <div className={overlayClass} style={{ background }} />
          <div className={overlayMsgClass}>
            <h1>copied</h1>
            <p className={isLightColor && "dark-text"}>{background}</p>
          </div>
          {/* original divs */}
          <div className="box-container">
            <div className="box-content">
              <span className={isDarkColor && "light-text"}>{name}</span>
            </div>
            <button className={`copy-btn ${isLightColor && "dark-text"}`}>copy</button>
          </div>
          {seeMoreLink && (
            <span className={`see-more ${isLightColor && "dark-text"}`} onClick={this.seeMore}>
              more
            </span>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withRouter(ColorBox);
