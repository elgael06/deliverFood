import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomeApp from "../pages/Home";
import AboutApp from "../pages/About";
import Products from "../pages/Products";

const Routes = ()=>{

    return(<Router>
        <Switch>
            <Route path='/' component={HomeApp} />
            <Route path='/add' component={Products} />
            <Route path='/edit/?id' component={Products} />            
            
            <Route path='/about' component={AboutApp} />
        </Switch>
    </Router>);
} 

export default Routes;


