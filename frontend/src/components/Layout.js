import React from 'react';
import { Link } from 'react-router-dom';
import './layout.css';
import { Button } from '@material-ui/core';

const LayoutApp = ({children})=>{

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
                <Button>Login</Button>
            </div>
        </nav>
        <div className='section'>
                {children}
        </div>
    </div>);
}

export default LayoutApp;