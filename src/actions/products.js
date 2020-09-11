import {api} from '../../package.json';
import { allProductos, addProducto, idProducto, updateProducto, deleteProducto } from '../api/products';

export const url = process.env['NODE_ENV']==='development' ? api.dev : api.prod;

export const fetchProductos = () =>{
    return async dispatch =>{
        dispatch({type:'LOADING',value:true});
        try{
            const res = await allProductos();
            console.log(res);
            if(res){
                dispatch({type:'ADD_PRODUCTS',value:res.data,page:res.data.numpages})
            }
        }catch(e){
            alert('Error al cargar ',e.toString())
        }
        dispatch({type:'LOADING',value:false});
    }
}

export const postProduct = (data=null) =>{
    return async dispatch =>{
        dispatch({type:'LOADING',value:true});
        try{
            const res = await addProducto({data});
            console.log(res);
            if(res){
                const prods = await allProductos();
                console.log(prods);
                dispatch({type:'ADD_PRODUCTS',value:prods.data,page:prods.data.numpages});
                window.history.back();
            }
        }catch(err){
            alert('error al guardar producto',err.toString());
        }
        dispatch({type:'LOADING',value:false});
    }
}

export const getProductId = id =>{
    return async dispatch =>{
        dispatch({type:'LOADING',value:true});
        try{
            dispatch({type:'SELECT_PRODUCT',value:null});
            const value = await idProducto(id);
            console.log(value);
            if(value){
                dispatch({type:'SELECT_PRODUCT',value});
            }
        }catch(err){
            alert(`el producto con id #${id} no se encontro`,err.toString());
            window.history.back();
        }
        dispatch({type:'LOADING',value:false});
    }
}

export const putProductId = (data=null) =>{
    return async dispatch =>{
        dispatch({type:'LOADING',value:true});
        try{
            const res = await updateProducto({data});
            console.log(res);
            if(res){
                const prods = await allProductos();
                dispatch({type:'ADD_PRODUCTS',value:prods.data,page:prods.data.numpages});
                window.history.back();
            }
        }catch(err){
            alert(`error al actualizar el producto!`);
        }
        dispatch({type:'LOADING',value:false});
    }
}

export const deleteProductId = (id=0) =>{
    return async dispatch =>{
        dispatch({type:'LOADING',value:true});
        try{
            await deleteProducto({id});
            dispatch({type:'ADD_PRODUCTS',value:[],page:0});
            
            const prods = await allProductos();
            dispatch({type:'ADD_PRODUCTS',value:prods.data,page:prods.data.numpages});
            
        }catch(err){
            alert(`error al eliminar el producto id ${id}`);
        }

        dispatch({type:'LOADING',value:false});
    }
}

