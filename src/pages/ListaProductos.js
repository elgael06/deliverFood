import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductos, deleteProductId } from '../actions/products';
import LayoutApp from '../components/Layout';
import { useHistory } from 'react-router-dom';

import { Fab, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, ListItemSecondaryAction, Dialog, Button, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment } from '@material-ui/core';
import {Add, Edit, Delete, CloseSharp, ListAltRounded, Check, Search } from '@material-ui/icons';
import { agregarItemClasificacion, eliminarItemClasificacion, fetchClasificaciones, fetchClasificacionesId } from '../api/clasificaciones';

import Checkbox from '@material-ui/core/Checkbox';

const ListaProductos =()=>{
    const {list=[]} = useSelector(state=>state.productsStore);
    const dispatch = useDispatch();
    const history = useHistory();
    const [modal,setModal] = useState(false);
    const [modalCat,setModalCat] = useState(false);
    const [selectedItem,setSelected] = useState(null);
    const [clasificaciones,setCasificaciones] = useState({
        datos:[],
        activos:[]
    });
    const [filtro,setFiltro] = useState('');

    useEffect(()=>{
        console.log('lista productos.')
        list.length===0 && obtenerProductos();
    },[]);
    const obtenerProductos =()=>{
        dispatch(fetchProductos());        
    }
    const push = rute =>{
        dispatch(d=>d({type:'LOADING',value:true}));
        history.push(rute);
    }

    const handleDelete = item =>{
        setSelected(item);
        setModal(true);
    }
    const BorrarPorID = () =>{
        dispatch(deleteProductId(selectedItem['pk'] || 0));
        setModal(false);
    }
    const seleccionarCategorias = async item =>{
        setSelected(item);
        setModalCat(true);

        setCasificaciones({
            datos:[],
            activos:[]
        });
        
       const datos = await fetchClasificaciones();
       const activos =await fetchClasificacionesId(item.pk);
        setCasificaciones({
            datos,
            activos
        });
    }
    const chequedClasificacion = item => async e =>{
        console.log(e.target.checked);
        const status = e.target.checked;
        const id = selectedItem.pk;
        let resp = [];
        
        setCasificaciones({
            ...clasificaciones,
            activos: status? [...clasificaciones.activos,item] : clasificaciones.activos.filter(i=>i.pk!==item.pk)
        });

        if(status)
            resp = await agregarItemClasificacion(id,item.pk);
        else 
            resp = await eliminarItemClasificacion(id,item.pk);
        setCasificaciones({
            ...clasificaciones,
            activos:resp
        });
    }

    return(<LayoutApp title='Productos.'>
        <TextField
            value={filtro}
            onChange={e=>setFiltro(e.target.value)}
            style={{width:'95%'}}
            placeholder='filtro comida...'
            InputProps={{
                startAdornment: <InputAdornment position="start"><Search /> </InputAdornment>,
            }}
        />
       <List style={{height:'70%',overflow:'auto'}}>
           {list.filter(it=>it.nombre.toUpperCase().includes(filtro.toUpperCase())).map(item=><Fragment key={item.pk}>
                   <ListItem >
                    <ListItemAvatar>
                        <Avatar src={item.image} />
                    </ListItemAvatar>
                    <ListItemText primary={item.nombre} secondary={item.ingredientes} />
                    <ListItemSecondaryAction  >
                        <IconButton color='inherit' onClick={()=>seleccionarCategorias(item)}>
                            <ListAltRounded />
                        </IconButton>
                        <IconButton color='primary' onClick={()=>push(`edit/${item.pk}`)}>
                            <Edit />
                        </IconButton>
                        <IconButton color='secondary' onClick={()=>handleDelete(item)}>
                            <Delete />
                        </IconButton>
                        </ListItemSecondaryAction>
                </ListItem>
                <Divider />
            </Fragment>)}
       </List>
 
       <Fab variant='extended' color='primary' href='/add' style={{position:'absolute',display:'flex',right:10,bottom:10,flexDirection:'row-reverse',}}>
           <Add  />
           Nuevo
       </Fab>

        <ModalBorrar 
            modal={modal}
            selectedItem={selectedItem}
            BorrarPorID={BorrarPorID}
            cancelar={()=>setModal(false)}
        />
        <ModalCategorias 
            modal={modalCat}
            selectedItem={selectedItem}
            child={<List style={{height:300,overflow:'auto'}}>
                {
                    clasificaciones.datos.map(item=>{
                        const activos = clasificaciones.activos || [];
                        const resp = activos.filter(e=>item.pk === e.pk);
                        return <ListItem key={item.pk}>
                            <ListItemAvatar>
                                <Avatar
                                    src={item.image}
                                />
                            </ListItemAvatar>
                            <ListItemText 
                                primary={item.name}
                            />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    checked={resp.length}
                                    onChange={chequedClasificacion(item)}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    })
                }
            </List>}
            aceptar={()=>setModalCat(false)}
        />

    </LayoutApp>);
}

const ModalBorrar = ({
    modal=false,
    selectedItem =null,
    BorrarPorID=e=>e,
    cancelar=e=>e,
}) => (<ModalGenerica 
    titulo='Borrar producto ?'
    modal={modal}
    selectedItem={selectedItem}
    botonesAccion={[ <Button color='inherit' onClick={cancelar} startIcon={<CloseSharp />} >Cancelar</Button>,
    <Button color='secondary' onClick={BorrarPorID} variant='outlined' startIcon={<Delete/>} >Aceptar</Button>]}
/>);

const ModalCategorias = ({
    modal=false,
    selectedItem =null,
    child=null,
    aceptar=e=>e,
})=>(<ModalGenerica 
    titulo='Categorias producto.'
    modal={modal}
    selectedItem={selectedItem}
    child={child}
    botonesAccion={<Button color='primary' onClick={aceptar} variant='outlined' startIcon={<Check/>} >Aceptar</Button>}
/>);

const ModalGenerica = ({
    modal=false,
    titulo='',
    selectedItem =null,
    child=null,
    botonesAccion = null
}) =>(<Dialog open={modal}>
    <DialogTitle> 
        <label>{titulo}</label>
    </DialogTitle>
    <DialogContent>
        {
            selectedItem && <ListItem >
            <ListItemAvatar>
                <Avatar src={selectedItem.image} />
            </ListItemAvatar>
            <ListItemText primary={selectedItem.nombre} secondary={selectedItem.ingredientes} />
        </ListItem>
        }
        {child}
    </DialogContent>
    <DialogActions>
        {botonesAccion}
    </DialogActions>
</Dialog>);

export default ListaProductos;