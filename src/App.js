import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Shop from './components/shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Order from './components/order/Order';
import Inventory from './components/inventory/Inventory';
import Detail from './components/detail/Detail';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Switch>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Order></Order>
          </Route>
          <Route path="/manage">
            <Inventory></Inventory>
          </Route>
          <Route path="/product/:productKey">
            <Detail></Detail>
          </Route>
          <Route path="*">
            <h1>Error</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
