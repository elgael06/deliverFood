import React, { Fragment, useEffect } from 'react';
import './App.css';
import Routes from './routes';
import RoutesLogout from './routes/RoutesLogout';
import Loading from './components/Loading';
import { useSelector } from 'react-redux';


function App() {
  const {loadding=true} = useSelector(state=>state.guiStore);
  const {sesion=false} = useSelector(state=>state.sesion);

  useEffect(()=>{
    console.log('sesion',sesion);
  },[sesion]);

  return <Fragment>
    {sesion ?<Routes /> : <RoutesLogout />}
    {loadding && <Loading /> }
  </Fragment> ;
}

export default App;
