import React, { useEffect } from 'react';
import LayoutApp from '../components/Layout';
import { useParams } from 'react-router-dom';
import { getProductId } from '../actions/products';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, InputAdornment, Card, CardMedia, CardContent, CardActions } from '@material-ui/core';

const Products = () =>{
    const dispatch = useDispatch();
    const {selected =null} = useSelector(state => state.productsStore)
    const {id} = useParams();

    useEffect(()=>{
        console.log('productos!!!',id);
        id ? setTimeout(()=>obtenerProducto(),200) : dispatch(d=>{
                console.log('loading');
                d({type:'LOADING',value:false})
            });
    },[]);

    const obtenerProducto = async ()=>{
        dispatch(getProductId(id));
    }

    return(<LayoutApp title={`${id ? "Editar":"nuevo"} Productos.`}>
        
        {selected!=null ?<div style={{display:'flex',justifyContent:'center',flexDirection:'column',padding:20}}>
            <Card>
                <CardMedia
                    component='img'
                    image={selected['image'] || '' }
                />
                <CardContent>

                <TextField 
                    fullWidth
                    label='imagen'
                    value={selected['image']}
                />
                <TextField 
                    fullWidth
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
                    fullWidth
                    label='ingredientes'
                    value={selected['ingredientes']}
                />
                <br />
                <TextField 
                    fullWidth
                    label='preparacion'
                    value={selected['preparacion']}
                />

                </CardContent>
                <CardActions>

            <Button color='primary' 
                    fullWidth variant='contained'>guardar cambios</Button>
                </CardActions>
            </Card>
        </div> : null}
    </LayoutApp>);
}

export default Products;