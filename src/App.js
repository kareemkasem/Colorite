import React , {Component} from "react";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelper";
import { Switch, Route } from "react-router-dom";
import "./styles/App.css";

import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette"
import NewPaletteForm from "./NewPaletteForm"

class App extends Component{
state = {
  palettes: seedColors
}

  findPalette = (id) => {
    return this.state.palettes.find((palette) => palette.id === id);
  };

  savePalette = (palette) => {
    this.setState(st=> ({palettes: [...st.palettes, palette]}))
  }

  render(){
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <PaletteList palettes={this.state.palettes}/>} />
        <Route exact path="/palette/new" render={()=> <NewPaletteForm savePalette={this.savePalette}/>} />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette
              palette={generatePalette(this.findPalette(routeProps.match.params.id))}
            />
          )}
        />
        <Route exact path="/palette/:paletteId/:colorId" render={(routeProps)=>
          <SingleColorPalette
           palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
           />
         }
           />
        <Route render={() => <h1>lol, wrong direction. go back nigga.</h1>} />
      </Switch>
    </div>
  );
}
}

export default App;
