import React, { useEffect } from 'react';
import LayoutApp from '../components/Layout';
import { useParams } from 'react-router-dom';

const Products = () =>{
    const {id} = useParams();

    useEffect(()=>{
        console.log('productos!!!',id);
    });

    return(<LayoutApp>
        <h3>Productos</h3>
        {id>0 ? <p>Editar</p>:<p>nuevo</p>}
    </LayoutApp>);
}

export default Products;