import React, { useEffect } from 'react';
import LayoutApp from '../components/Layout';
import {  Fab } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowBack, WarningOutlined } from '@material-ui/icons';


const ErrorPage = ()=>{
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(d=>d({type:'LOADING',value:false}));
    },[]);

    const regregar =()=>{
        history.goBack();
    }


    return(<LayoutApp title='ERROR!' back={false}>
        <div style={{justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',height:'60%'}}>
            <WarningOutlined color='error' style={{fontSize:60}} />
            <p style={{color:'#000',fontSize:70,margin:'20px 0'}}>404</p>
            <u style={{margin:'30px 0'}} > pagina no encontrada!</u>
            <Fab variant='extended' color='default' onClick={regregar}>
                <ArrowBack />
                regresar
            </Fab>
        </div>
    </LayoutApp>)
}

export default ErrorPage;