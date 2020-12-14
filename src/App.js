import ReactNotification from "react-notifications-component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "react-notifications-component/dist/theme.css";
import "./App.scss";

import Header from "./containers/Header/Header";
import Background from "./pictures/background.png";
import StartPage from "./containers/StartPage/StartPage";
import Tables from "./containers/Tables/Tables.js";
import AdminPanel from "./containers/AdminPanel/AdminPanel";
import GameTable from "./containers/GameTable/GameTable";

function App() {
  return (
    <Router>
      <div className="app">
        <ReactNotification />
        <Header />
        <Switch>
          <Route path="/table/:id">
            <GameTable />
          </Route>
          <Route path="/adminPanel">
            <AdminPanel />
          </Route>
          <Route path="/tables">
            <Tables />
          </Route>
          <Route path="/">
            <StartPage />
          </Route>
        </Switch>
        <img src={Background} className="app__background" alt="Background" />
      </div>
    </Router>
  );
}

export default App;
