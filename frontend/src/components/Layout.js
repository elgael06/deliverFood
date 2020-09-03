import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './layout.css';
import { Button, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { removeSesion } from '../actions/sesion';
import { ArrowBack } from '@material-ui/icons';

const LayoutApp = ({back=true,children,title=''})=>{
    const dispatch = useDispatch();
    const history = useHistory();

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
                <Button onClick={logOut}>Logout</Button>
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