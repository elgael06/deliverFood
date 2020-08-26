import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomeApp from "../pages/Home";
import AboutApp from "../pages/About";
import Products from "../pages/Products";

const RoutesLogout = ()=>{

    return(<Router>
        <Switch>
            <Route path='/' exact component={()=>{
                return <div>Login</div>
            }} />
            <Route path='/*' component={()=><h3>Pagina no encontrada !!!</h3>} />
        </Switch>
    </Router>);
} 

export default RoutesLogout;