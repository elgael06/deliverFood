import React from 'react';
import { Link } from 'react-router-dom';

const LayoutApp = ({children})=>{

    return(<div>
        <nav className='uk-navbar-container'>
            <div className='uk-navbar-left'>
                <ul className='uk-navbar-nav'>
                    <li><Link to='/'> Home </Link></li>
                </ul>
            </div>
        </nav>
        <div className='uk-section'>
            <div className='uk-container'>
                {children}
            </div>
        </div>
    </div>);
}

export default LayoutApp;