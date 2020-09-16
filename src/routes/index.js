import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ListaProductos from "../pages/ListaProductos";
import AboutApp from "../pages/About";
import Products from "../pages/Producto";
import HomeApp from '../pages/Home';
import ErrorPage from "../pages/ErrorPage";
import AccessControl from "../pages/accessControl";
import Clasificaciones from "../pages/Clasificaciones";

const Routes = ()=>{

    return(<Router>
        <Switch>
            <Route path='/login' component={()=><Redirect to='/' />} /> 
            <Route path='/' exact component={HomeApp} />

            <Route path='/ProductsList' exact component={ListaProductos} />
            <Route path='/add' exact component={Products} />
            <Route path='/edit/:id' exact component={Products} />

            <Route path='/accesoControl' exact component={AccessControl} />
            
            <Route path='/about' exact component={AboutApp} />
            <Route path='/productCat' exact component={Clasificaciones} />
            <Route path='/*' component={ErrorPage} />
        </Switch>
    </Router>);
} 

export default Routes;


