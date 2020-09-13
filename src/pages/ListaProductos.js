import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductos, deleteProductId } from '../actions/products';
import LayoutApp from '../components/Layout';
import { useHistory } from 'react-router-dom';

import { Fab, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, ListItemSecondaryAction, Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import {Add, Edit, Delete, CloseSharp, ListAltRounded } from '@material-ui/icons';

const ListaProductos =()=>{
    const {list=[]} = useSelector(state=>state.productsStore);
    const dispatch = useDispatch();
    const history = useHistory();
    const [modal,setModal] = useState(false);
    const [selectedItem,setSelected] = useState(null);

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
    const seleccionarCategorias = id =>{

    }

    return(<LayoutApp title='Productos.'>
       <List style={{height:'80%',overflow:'auto'}}>
           {list.map(item=><Fragment key={item.pk}>
                   <ListItem >
                    <ListItemAvatar>
                        <Avatar src={item.image} />
                    </ListItemAvatar>
                    <ListItemText primary={item.nombre} secondary={item.ingredientes} />
                    <ListItemSecondaryAction  >
                    <IconButton color='inherit' onClick={()=>seleccionarCategorias(item.pk)}>
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

    </LayoutApp>);
}

const ModalBorrar = ({
    modal=false,
    selectedItem =null,
    BorrarPorID=e=>e,
    cancelar=e=>e
}) => (<Dialog open={modal}>
    <DialogTitle> 
        <label>Borrar producto ?</label>
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
    </DialogContent>
    <DialogActions>
        <Button color='inherit' onClick={cancelar} startIcon={<CloseSharp />} >Cancelar</Button>
        <Button color='secondary' onClick={BorrarPorID} variant='outlined' startIcon={<Delete/>} >Aceptar</Button>
    </DialogActions>
</Dialog>);

export default ListaProductos;