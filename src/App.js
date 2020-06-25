import React from "react";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelper";
import { Switch, Route } from "react-router-dom";
import "./styles/App.css";

import Palette from "./Palette";

function App() {
  const findPalette = (id) => {
    return seedColors.find((palette) => palette.id === id);
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <h1>hahaha</h1>} />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette
              palette={generatePalette(findPalette(routeProps.match.params.id))}
            />
          )}
        />
        <Route render={() => <h1>lol go back nigga</h1>} />
      </Switch>
    </div>
  );
}

export default App;
