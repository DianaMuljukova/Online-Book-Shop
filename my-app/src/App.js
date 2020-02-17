import React from 'react';
import './App.css';
import Header from './views/Header/Header';
import Content from './views/Content/Content';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from "./views/Header/Login";

function App() {
  return (
    <BrowserRouter>
    <>
      <Header/>
      <Switch>
        <Route exact path="/login" component={Login}/>
      </Switch>

    </>
    </BrowserRouter>
  );
}

export default App;
