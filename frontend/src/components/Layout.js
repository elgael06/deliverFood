import React from 'react';
import { Link } from 'react-router-dom';
import './layout.css';

const LayoutApp = ({children})=>{

    return(<div className='app-container'>
        <nav className='uk-navbar-container'>
            <div className='uk-navbar-left'>
                <ul className='uk-navbar-nav'>
                    <Link to='/'> Home </Link>
                    <Link to='/about'> About </Link>
                </ul>
            </div>
        </nav>
        <div className='uk-section'>
                {children}
        </div>
    </div>);
}

export default LayoutApp;