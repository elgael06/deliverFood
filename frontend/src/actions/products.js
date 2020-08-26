import axios from 'axios';
import {api} from '../../package.json';

export const fetchProductos = () =>{

    return async dispatch =>{
        const res = await axios.get(`${api.dev}/api/store/products/`);
        console.log(res.data);
        if(res.data){
            dispatch({type:'ADD_PRODUCTS',value:res.data.data,page:res.data.data.numpages})
        }
    }
}

