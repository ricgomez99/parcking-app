import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import RegisterCarForm from "./components/registerCarForm";
import RegisterMotoForm from "./components/registerMotoForm";
import RegisterBikeForm from "./components/registerBikeForm";
import Users from "./components/users";
import NotFound from "./components/not-found";
import NavBar from "./components/navBar";
import IngresoForm from "./components/ingresoForm";
import HistoryTable from "./components/historyTable";
import "./App.css";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <NavBar />
        <main>
          <Switch>
            <Route path="/ingresoForm" component={IngresoForm} />
            <Route path="/users/:id" component={RegisterCarForm} />
            <Route path="/users-2/:id" component={RegisterMotoForm} />
            <Route path="/users-3/:id" component={RegisterBikeForm} />
            <Route path="/users" component={Users} />
            <Route path="/historyTable" component={HistoryTable} />
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/ingresoForm" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    </div>
  );
}

export default App;
