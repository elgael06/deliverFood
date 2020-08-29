import axios from 'axios';
import {api} from '../../package.json';

const url = process.env['NODE_ENV']==='development' ? api.dev : api.prod;

export const addSesion = ({email='',password='' }) => {

    return async dispatch=>{
        dispatch({type:'LOADING',value:true});
        
        const response = await axios.post(`${url}/api/sesion/login/`,{email,password});
        console.log(response);

        dispatch({type:'LOADING',value:false});
        if(response.data.sesion){
            dispatch({type:'ADD_SESION',value:{
                "id"     : response.data.id,
                "nombre" : response.data.nombre,
                "apeido" : response.data.apeido,
                "email"  : response.data.email,
                "apodo"  : response.data.apodo,
                "token"  : response.data.token,
                "sesion" : response.data.sesion
            }});
        }
        else alert(response.data.message);
    }
}

export const removeSesion = () => {
    return dispatch=>dispatch({type:'REMOVE_SESION'});
}