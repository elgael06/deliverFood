import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './layout.css';
import { Avatar, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { removeSesion } from '../actions/sesion';
import { AccountCircle, ArrowBack, ExitToApp, } from '@material-ui/icons';
import Fade from '@material-ui/core/Fade';

const LayoutApp = ({back=true,children,title=''})=>{
    const {nombre='',apeido='' } = useSelector(state=>state.sesion);
    const dispatch = useDispatch();
    const history = useHistory();
    const [menu,setMenu] = useState(false);

    const logOut = ()=>{
        dispatch(removeSesion())
        history.push('/login');
    }
    return(<div className='app-container'>
        <nav className='navbar-container'>
            <section className='title-app'>Deliver food</section>
            <div className='navbar-left'>
                <ul className='navbar-nav-list'>
                    <Link to='/'> Home </Link>
                    <Link to='/about'> About </Link>
                </ul>
            </div>

        <div className='navbar-rigth'>
                <IconButton color='secondary' onClick={()=>setMenu(true)} >
                    <Avatar>{nombre[0] + apeido[0]}</Avatar>
                </IconButton>
                <Menu 
                    variant='selectedMenu' 
                    style={{right:16}} 
                     keepMounted 
                     TransitionComponent={Fade} 
                     anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                     open={menu} onClose={()=>setMenu(false)}>
                    <MenuItem onClick={()=>history.push('/porfile')}> <AccountCircle />{' ' +nombre}</MenuItem>
                    <MenuItem onClick={logOut}> <ExitToApp />  salir</MenuItem>
                </Menu>
            </div>
        </nav>
        <div className='section'>
            <section style={{height:48,display:'flex',alignItems:'center'}}>
                { back &&<IconButton onClick={history.goBack}>
                    <ArrowBack />
                </IconButton>}
                <b style={{margin:'5px 20px',fontSize:21}}>{title}</b>
            </section>
            <hr />
            {children}
        </div>
    </div>);
}

export default LayoutApp;