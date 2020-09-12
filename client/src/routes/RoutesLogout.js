import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from  "../pages/login";

const RoutesLogout = ()=>{

    return(<Router>
        <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/*' component={()=><Redirect to='/login' />} />
        </Switch>
    </Router>);
} 

export default RoutesLogout;