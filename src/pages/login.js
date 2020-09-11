import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import '../styles/login_page.css';
import { TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import {LockOpenOutlined,Lock, AccountCircle, VpnKeyRounded} from '@material-ui/icons';
import { addSesion } from '../actions/sesion';


const Login = ()=>{
    const dispatch = useDispatch();
    
    const [email,setEmail]  = useState('');
    const [pass,setPass]    = useState('');
    const [statusPass,setStatusPass] = useState(true);

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

            <form onSubmitCapture={enviar}>
                <TextField 
                    label='Correo'
                    className='form-email'
                    fullWidth
                    type='email'
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    InputProps={{
                        startAdornment:(<InputAdornment style={{marginRight:5}}><AccountCircle /></InputAdornment>)
                    }}
                />
                <TextField 
                    label='Contraseña'
                    className='form-email'
                    fullWidth
                    type={ statusPass ? 'password' : 'text'}
                    value={pass}
                    onChange={e=>setPass(e.target.value)}
                    InputProps={{
                        startAdornment:(<InputAdornment style={{marginRight:5}} ><VpnKeyRounded /></InputAdornment>),
                        endAdornment:(<InputAdornment ><IconButton onClick={()=>setStatusPass(!statusPass)}>{statusPass ? <LockOpenOutlined /> : <Lock/>}</IconButton></InputAdornment>)
                    }}
                />
                <Button color='primary'  onClick={enviar} variant='contained' fullWidth>entrar</Button>
            </form>
        </div>
    </div>);
}
// style={{background:'#4caf50',color:'#EEE'}}

export default Login;