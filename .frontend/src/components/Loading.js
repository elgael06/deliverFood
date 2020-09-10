import React, { useEffect, useState } from 'react';
import './loadin.css';
import { CircularProgress } from '@material-ui/core';


export default ({status=false})=>{

    return<div className='loading-container'>
        <CircularProgress />
    </div>
}