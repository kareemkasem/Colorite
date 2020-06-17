import React from "react";
import seedColors from "./seedColors";
import "./styles/App.css";

import Palette from "./Palette";

function App() {
  return (
    <div className="App">
      <Palette {...seedColors[4]} />
    </div>
  );
}

export default App;
