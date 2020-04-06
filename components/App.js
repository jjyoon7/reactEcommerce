import React from 'react';
import {Switch, Route} from "react-router-dom";
import Header from "../pages/Header";
import Cart from "../pages/Cart";
import Product from "../pages/Product";

function App() {
    return (
      <div className="root-grid">
          <Header/>

          <Switch>
            <Route exact path="/">
              <Product/>
            </Route>
            <Route path="/cart">
              <Cart/>
            </Route>
          </Switch>
      </div>
    );
  }
  
export default App;