import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductos } from '../actions/products';
import LayoutApp from '../components/Layout';
import { useHistory } from 'react-router-dom';

import { Fab, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, ListItemSecondaryAction } from '@material-ui/core';
import {Add, Edit, Delete, ImageRounded } from '@material-ui/icons';

const ListaProductos =()=>{
    const {list=[],page=0} = useSelector(state=>state.productsStore);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        console.log('home')
        list.length==0 && obtenerProductos();
    },[]);
    const obtenerProductos =()=>{
        dispatch(fetchProductos());        
    }
    const push = rute =>{
        dispatch(d=>d({type:'LOADING',value:true}));
        history.push(rute);
    }

    return(<LayoutApp title='Productos.'>
       <List style={{height:'80%',overflow:'auto'}}>
           {
               list.map(item=>[<ListItem key={item.pk} >
                   <ListItemAvatar>
                       <Avatar src={item.image} />
                   </ListItemAvatar>
                   <ListItemText primary={item.nombre} secondary={item.ingredientes} />
                   <ListItemSecondaryAction  >
                       <IconButton color='primary' onClick={()=>push(`edit/${item.pk}`)}>
                           <Edit />
                       </IconButton>
                       <IconButton color='secondary'>
                           <Delete />
                       </IconButton>
                    </ListItemSecondaryAction>
               </ListItem>,<Divider />])
           }
       </List>
 
       <Fab variant='extended' color='primary' href='/add' style={{position:'absolute',display:'flex',right:10,bottom:10,flexDirection:'row-reverse',}}>
           <Add  />
           Nuevo
       </Fab>
    </LayoutApp>);
}

export default ListaProductos;