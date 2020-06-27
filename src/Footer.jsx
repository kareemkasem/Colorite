import React from "react";

export default function Footer(props) {
  const { paletteName, emoji } = props;
  return (
    <div>
      <footer className="palette-footer">
        {paletteName}
        <span className="footer-emoji">{emoji}</span>
      </footer>
    </div>
  );
}
