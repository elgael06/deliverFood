import axios from 'axios';
import {api} from '../../package.json';

const url = process.env['NODE_ENV']==='development' ? api.dev : api.prod;

export const allProductos = async ()=>{
    const res = await axios.get(`${url}/api/store/products/`);
    return res.data;
}

export const addProducto = async ({data}) =>{
    const res = await axios.post(`${url}/api/store/products/`,data);
    return res.data;
}

export const idProducto = async (id)=>{
    const res = await axios.get(`${url}/api/store/products/${id}`);
    return res.data;
}

export const updateProducto = async ({data={}})=>{
    const res = await axios.put(`${url}/api/store/products/${data['pk']}`,data);
    return res.data;
}

export const deleteProducto = async ({id=0})=>{
    const res = await axios.delete(`${url}/api/store/products/${id}`);
    return res.data;
}