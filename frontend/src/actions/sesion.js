import axios from 'axios';
import {api} from '../../package.json';
import showNotification from '../messages';

const url = process.env['NODE_ENV']==='development' ? api.dev : api.prod;

export const addSesion = ({email='',password='' }) => {

    return async dispatch=>{
        dispatch({type:'LOADING',value:true});
        try{
            const response = await axios.post(`${url}/api/sesion/login/`,{email,password});
            console.log(response);
    
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
            showNotification({
                tag:'Alerta Sesion',
                body:`Bienvenido ${response.data.nombre}.`
            })
            }
            else {
                alert(response.data.message);
                showNotification({
                    tag:'Alerta Sesion',
                    body:`Error: ${response.data.message}.`
                })
            }
        }catch(error){
            showNotification({
                tag:'Alerta Sesion',
                body:'<p>para iniciar sesion primero tiene que autorizar el acceso al api!</p>'
            })
            window.open(url);
            alert('ir a url de api, en opciones avanzadas dar clic en proceder a url');
        }
    
        dispatch({type:'LOADING',value:false});
    }
}

export const removeSesion = () => {
    showNotification({
        tag:'alerta sesion',
        body:'se ha cerrado la sesion!'
    })
    return dispatch=>dispatch({type:'REMOVE_SESION'});
}