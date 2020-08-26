import axios from 'axios';
import {api} from '../../package.json';

const url = process.env['NODE_ENV']==='development' ? api.dev : api.prod;

export const fetchProductos = () =>{
    return async dispatch =>{
        dispatch({type:'LOADING',value:true});
        const res = await axios.get(`${url}/api/store/products/`);
        console.log(res.data);
        if(res.data){
            dispatch({type:'ADD_PRODUCTS',value:res.data.data,page:res.data.data.numpages})
        }
        dispatch({type:'LOADING',value:false});
    }
}

export const postProduct = (id=0,data=null) =>{
    return async dispatch =>{
        dispatch({type:'LOADING',value:true});
        const res = await axios.post(`${url}/api/store/products/${id}`,data);
        console.log(res.data);
        if(res.data){
            const prods = await axios.get(`${url}/api/store/products/`);
            dispatch({type:'ADD_PRODUCTS',value:prods.data.data,page:prods.data.data.numpages});
        }
        dispatch({type:'LOADING',value:false});
    }
}

export const getProductId = id =>{
    return async dispatch =>{
        dispatch({type:'LOADING',value:true});
        const res = await axios.get(`${url}/api/store/products/${id}`);
        console.log(res.data);
        if(res.data){
            dispatch({type:'SELECT_PRODUCT',value:res.data});
        }
        dispatch({type:'LOADING',value:false});
    }
}

export const putProductId = (id=0,data=null) =>{
    return async dispatch =>{
        dispatch({type:'LOADING',value:true});
        const res = await axios.put(`${url}/api/store/products/${id}`,data);
        console.log(res.data);
        if(res.data){
            const prods = await axios.get(`${url}/api/store/products/`);
            dispatch({type:'ADD_PRODUCTS',value:prods.data.data,page:prods.data.data.numpages});
        }
        dispatch({type:'LOADING',value:false});
    }
}

export const deleteProductId = (id=0) =>{
    return async dispatch =>{
        dispatch({type:'LOADING',value:true});
        const res = await axios.delete(`${url}/api/store/products/${id}`);
        console.log(res.data);
        if(res.data){
            const prods = await axios.get(`${url}/api/store/products/`);
            dispatch({type:'ADD_PRODUCTS',value:prods.data.data,page:prods.data.data.numpages});
        }
        dispatch({type:'LOADING',value:false});
    }
}

