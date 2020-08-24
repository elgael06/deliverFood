import axios from 'axios';

export const fetchProductos = () =>{

    return async dispatch =>{
        const res = await axios.get('http://localhost:8000/api/store/products/');
        console.log(res.data);
        if(res.data){
            dispatch({type:'ADD_PRODUCTS',value:res.data.data,page:res.data.data.numpages})
        }
    }
}

