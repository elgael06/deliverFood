import React, { useEffect } from 'react';
import LayoutApp from '../components/Layout';
import { useParams } from 'react-router-dom';
import { getProductId } from '../actions/products';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, InputAdornment } from '@material-ui/core';

const Products = () =>{
    const dispatch = useDispatch();
    const {selected =null} = useSelector(state => state.productsStore)
    const {id} = useParams();

    useEffect(()=>{
        console.log('productos!!!',id);
        id ? obtenerProducto() : dispatch(d=>{
                console.log('loading');
                d({type:'LOADING',value:false})
            });
    },[]);

    const obtenerProducto = async ()=>{
        dispatch(getProductId(id));
    }

    return(<LayoutApp>
        <h3>{id ? "Editar":"nuevo"} Productos</h3>
        
        {selected!=null ?<div style={{display:'flex',justifyContent:'center',flexDirection:'column',padding:20}}>
            <TextField 
                label='nombre'
                value={selected['nombre']}
            />
            <br />
            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
                <TextField 
                    label='precio'
                    value={selected['price']}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
                <br />
                <TextField 
                    label='costo'
                    value={selected['costo']}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
                <br />
                <TextField 
                    label='cantidad'
                    value={selected['cantidad']}
                    InputProps={{
                        endAdornment: <InputAdornment position="start">PZ</InputAdornment>,
                    }}
                />
            </div>
            <br />
            <TextField 
                label='ingredientes'
                value={selected['ingredientes']}
            />
            <br />
            <TextField 
                label='preparacion'
                value={selected['preparacion']}
            />
            <br />
            <img src={selected['image']} width='150' height='150' alt='imagen producto' style={{borderRadius:100}} />
            <br />
            <TextField 
                label='imagen'
                value={selected['image']}
            />
            <br />
            <Button color='primary' variant='contained'>guardar cambios</Button>
        </div> : null}
    </LayoutApp>);
}

export default Products;