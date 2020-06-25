import React from "react";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelper";
import "./styles/App.css";

import Palette from "./Palette";

function App() {
  return (
    <div className="App">
      <Palette palette={generatePalette(seedColors[4])} />
    </div>
  );
}

export default App;
