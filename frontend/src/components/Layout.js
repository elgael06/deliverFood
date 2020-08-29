import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './layout.css';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { removeSesion } from '../actions/sesion';

const LayoutApp = ({children})=>{
    const dispatch = useDispatch();
    const history = useHistory();

    const logOut = ()=>{
        dispatch(removeSesion())
        history.push('/login')
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
                {children}
        </div>
    </div>);
}

export default LayoutApp;