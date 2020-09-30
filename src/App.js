import React, { useState } from 'react';
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
import Login from './components/login/Login';
import { createContext } from 'react';
import PrivateRoute from './components/privateroute/PrivateRoute';
import Shipment from './components/shipment/Shipment';
export const UserContext = createContext();

function App() {
  const [loginUser, setLoginUser] = useState({});
  return (
    <UserContext.Provider value={[loginUser, setLoginUser]}>
      <Router>
        <Header></Header>
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
          <PrivateRoute path="/manage">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/product/:productKey">
            <Detail></Detail>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="*">
            <h1>Error</h1>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
