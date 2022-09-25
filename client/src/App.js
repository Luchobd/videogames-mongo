import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import VideoGameCreate from "./components/VideogameCreate";
import VideogameDetail from "./components/VideogameDetail";
import Thanks from "./components/Thanks";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"} component={LandingPage} />
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/videogame"} component={VideoGameCreate} />
        <Route exact path={"/videogame/:id"} component={VideogameDetail} />
        <Route path={"/thanks"} component={Thanks} />
        <Route path={"*"} component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
