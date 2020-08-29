import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import '../styles/login_page.css';
import { TextField, Button } from '@material-ui/core';
import { addSesion } from '../actions/sesion';
import { useHistory } from 'react-router-dom';


const Login = ()=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const [email,setEmail]  = useState('');
    const [pass,setPass]    = useState('');

    useEffect(()=>{
        setTimeout(()=>dispatch(d=>d({type:'LOADING',value:false})),1000);
    },[]);

    const enviar = ()=>{
        console.log(email,pass);
        if(email && pass){
            dispatch(addSesion({email,password:pass}));
        }
    }

    return(<div className='login-container'>
        <div className='form-login'>

            <TextField 
                variant='filled'
                label='Correo'
                className='form-email'
                fullWidth
                type='email'
                value={email}
                onChange={e=>setEmail(e.target.value)}
            />
            <TextField 
                variant='filled'
                label='Contraseña'
                className='form-email'
                fullWidth
                type='password'
                value={pass}
                onChange={e=>setPass(e.target.value)}
            />
            <Button color='primary' onClick={enviar} variant='contained' fullWidth>entrar</Button>
        </div>
    </div>);
}
// style={{background:'#4caf50',color:'#EEE'}}

export default Login;