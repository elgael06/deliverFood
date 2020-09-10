import React, { Fragment, useEffect } from 'react';
import './App.css';
import Routes from './routes';
import RoutesLogout from './routes/RoutesLogout';
import Loading from './components/Loading';
import { useSelector, useDispatch } from 'react-redux';


function App() {
  const {loadding=true} = useSelector(state=>state.guiStore);
  const {sesion=false} = useSelector(state=>state.sesion);
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log('sesion',sesion);
    
  },[sesion]);
  useEffect(()=>{
    dispatch(d=>d({type:'LOADING',value:false}));
  },[])
  return <Fragment>
    {sesion ?<Routes /> : <RoutesLogout />}
    {loadding && <Loading /> }
  </Fragment> ;
}

export default App;
