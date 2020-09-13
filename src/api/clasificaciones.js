
import axios from 'axios';

export const fetchClasificaciones = async () =>{
    const resp  = await axios.get(`/api/store/clasificaciones/`);
    console.log(resp);
    return resp.data;
}

export const fetchClasificacionesId = async id =>{
    const resp  = await axios.get(`/api/store/products/${id}/clasificaciones/`);
    console.log(resp);
    return resp.data.data;
}

export const eliminarItemClasificacion = async (id=0,idClasificacion=0 ) =>{
    const res = await axios.delete(`/api/store/products/${id}/clasificaciones/${idClasificacion}`);
    
    return res.data.data;
}
export const agregarItemClasificacion = async (id=0,idClasificacion=0 ) =>{
    const res = await axios.post(`/api/store/products/${id}/clasificaciones/${idClasificacion}`);
    
    return res.data.data;
}



