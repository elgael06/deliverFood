import axios from 'axios';
import {api} from '../../package.json';
import { allProductos, addProducto, idProducto, updateProducto } from '../api/products';

const url = process.env['NODE_ENV']==='development' ? api.dev : api.prod;

export const fetchProductos = () =>{
    return async dispatch =>{
        dispatch({type:'LOADING',value:true});
        const res = await allProductos();
        console.log(res);
        if(res){
            dispatch({type:'ADD_PRODUCTS',value:res.data,page:res.data.numpages})
        }
        dispatch({type:'LOADING',value:false});
    }
}

export const postProduct = (id=0,data=null) =>{
    return async dispatch =>{
        dispatch({type:'LOADING',value:true});
        const res = await addProducto({id,data});
        console.log(res.data);
        if(res.data){
            const prods = await allProductos();
            dispatch({type:'ADD_PRODUCTS',value:prods.data,page:prods.data.numpages});
        }
        dispatch({type:'LOADING',value:false});
    }
}

export const getProductId = id =>{
    return async dispatch =>{
        dispatch({type:'LOADING',value:true});
        dispatch({type:'SELECT_PRODUCT',value:null});
        const value = await idProducto(id);
        console.log(value);
        if(value){
            dispatch({type:'SELECT_PRODUCT',value});
        }
        dispatch({type:'LOADING',value:false});
    }
}

export const putProductId = (id=0,data=null) =>{
    return async dispatch =>{
        dispatch({type:'LOADING',value:true});
        const res = await updateProducto({id,data});
        console.log(res.data);
        if(res.data){
            const prods = await allProductos();
            dispatch({type:'ADD_PRODUCTS',value:prods.data.data,page:prods.data.data.numpages});
        }
        dispatch({type:'LOADING',value:false});
    }
}

export const deleteProductId = (id=0) =>{
    return async dispatch =>{
        dispatch({type:'LOADING',value:true});
        const res = await deleteProductId({id});
        console.log(res.data);
        if(res.data){
            const prods = await allProductos();
            dispatch({type:'ADD_PRODUCTS',value:prods.data.data,page:prods.data.data.numpages});
        }
        dispatch({type:'LOADING',value:false});
    }
}

