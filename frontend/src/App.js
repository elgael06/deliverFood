import React, { Fragment } from 'react';
import './App.css';
import Routes from './routes';
import RoutesLogout from './routes/RoutesLogout';
import Loading from './components/Loading';
import { useSelector } from 'react-redux';


function App() {
  const {loadding=true} = useSelector(state=>state.guiStore);

  return <Fragment>
    {true ?<Routes /> : <RoutesLogout />}
    {loadding && <Loading /> }
  </Fragment> ;
}

export default App;
