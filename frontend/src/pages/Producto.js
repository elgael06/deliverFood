import React, { useEffect } from 'react';
import LayoutApp from '../components/Layout';
import { useParams, useHistory } from 'react-router-dom';
import { getProductId, putProductId, postProduct } from '../actions/products';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, InputAdornment, Card, CardMedia, CardContent, CardActions } from '@material-ui/core';

const Products = () =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const {selected =null} = useSelector(state => state.productsStore)
    const {id} = useParams();

    useEffect(()=>{
        console.log('productos!!!',id);
        id ? setTimeout(()=>obtenerProducto(),200) : dispatch(d=>{
                console.log('loading');
                d({type:'LOADING',value:false})
                dispatch(d=>d({type:'SELECT_PRODUCT',value:{
                    cantidad: 0,
                    costo: 0,
                    image: "",
                    ingredientes: "",
                    nombre: "",
                    pk: 0,
                    preparacion: ".",
                    price: 0,
                }}));
            });
    },[]);

    const handleChange = label => e =>{
        const value = {...selected};
        value[label] = e.target.value;
        dispatch(d=>d({type:'SELECT_PRODUCT',value}));
    }
    const enviarCambios = ()=>{
        console.log('enviar cambios',selected);
        if(    selected['imagen']       !=''
            && selected['nombre']       !=''
            && selected['ingredientes'] !=''
            && selected['costo']        >0
            && selected['preparacion']  !=''
            && selected['price']        >0 
        ){
            console.log('guardar');
            const guardardo = selected['pk'] ? putProductId :postProduct;
            dispatch(guardardo(selected));
            //history.goBack();
        }
    }

    const obtenerProducto = async ()=>{
        dispatch(getProductId(id));
    }

    return(<LayoutApp title={`${id ? "Editar":"nuevo"} Productos.`}>
        
        {selected!=null ?<div style={{display:'flex',justifyContent:'center',flexDirection:'column',padding:20}}>
            <Card>
                <CardMedia
                    component='img'
                    image={selected['image'] || '' }
                    height={300}
                />
                <CardContent>

                <TextField 
                    fullWidth
                    label='link imagen'
                    value={selected['image']}
                    onChange={handleChange('image')}
                />
                <TextField 
                    fullWidth
                    label='nombre'
                    value={selected['nombre']}
                    onChange={handleChange('nombre')}
                />
                <br />
                <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
                    <TextField 
                        label='precio'
                        type='number'
                        value={selected['price']}
                        onChange={handleChange('price')}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                    <br />
                    <TextField 
                        label='costo'
                        type='number'
                        value={selected['costo']}
                        onChange={handleChange('costo')}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                    <br />
                    <TextField 
                        label='cantidad'
                        type='number'
                        disabled
                        value={selected['cantidad']}
                        onChange={handleChange('cantidad')}
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
                    onChange={handleChange('ingredientes')}
                />
                <br />
                <TextField 
                    fullWidth
                    label='preparacion'
                    value={selected['preparacion']}
                    onChange={handleChange('preparacion')}
                />

                </CardContent>
                <CardActions>

            <Button 
                color='primary' 
                onClick={enviarCambios}
                fullWidth variant='contained'>guardar cambios</Button>
                </CardActions>
            </Card>
        </div> : null}
    </LayoutApp>);
}

export default Products;