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
            <Route path='/' exact component={HomeApp} />
            <Route path='/add' exact component={Products} />
            <Route path='/edit/:id' exact component={Products} />            
            
            <Route path='/about' exact component={AboutApp} />
            <Route path='/*' component={()=><h3>Pagina no encontrada !!!</h3>} />
        </Switch>
    </Router>);
} 

export default Routes;


