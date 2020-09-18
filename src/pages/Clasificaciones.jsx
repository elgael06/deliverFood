import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Fab, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField } from '@material-ui/core';
import { Add, Check, Close, DeleteForever, Edit, Search } from '@material-ui/icons';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { eliminarClasificador, fetchClasificaciones } from '../api/clasificaciones';
import LayoutApp from '../components/Layout'
import ModalGenerica from '../components/modalGenerica';

const Clasificaciones = ()=>{
    const dispatch = useDispatch();
    const [state,setState] = useState({
        datos:[],
        activos:[],
        filtro:'',
    });
    const [modal,setModal] = useState({
        status:false,
        title:'',
        item:null,
        edit:false,
        new:false
    });

    useEffect(()=>{
        obtenerClasificadores();
    },[]);

    const obtenerClasificadores = async () =>{
        dispatch(d=>d({
            type:'LOADING',value:true
        }));
        const datos = await fetchClasificaciones();
        console.log(datos);
        setState({
            ...state,
            datos,
        });
        dispatch(d=>d({
            type:'LOADING',value:false
        }));
    }

    const editarCat = item => e =>{
        console.log(`${e} ,${item.name}`);
        setModal({
            status:true,
            title: e ==='edit' ? 'Editar Categoria.':'Borrar Categoria.',
            item,
            edit:e === 'edit',
            new:false
        });
    }
    const nuevoCat = ()=>{
        setModal({
            status:true,
            title: 'Nueva Categoria.',
            item:{ 
                image:'',
                name:'',
            },
            edit:true,
            new:false
        });
    }

    const handleDelete = async () =>{
        console.log('eliminar',modal.item.name);
        const res = await eliminarClasificador(modal.item.pk);
        if (res){
            setModal({
                ...modal,
                status:false
            })
        }else{
            console.log('error al Guardar...');
        }
    }
    const saveEdit = editItem =>{
        console.log('guardar edicion.',editItem);
    }
    return (<LayoutApp title='Categorias'>
        <TextField
            value={state.filtro}
            variant='outlined'
            onChange={e=>setState({
                ...state,
                filtro:e.target.value
            })}
            style={{width:'95%'}}
            placeholder='filtro comida...'
            InputProps={{
                startAdornment: <InputAdornment position="start"><Search /> </InputAdornment>,
            }}
        />
        <List style={{height:'58%',overflow:'auto'}}>
            {
                state.datos.filter(e=>e.name.toUpperCase().includes(state.filtro.toUpperCase())).map(item=>{
                    return <ListItem key={item.pk}>
                        <ListItemAvatar>
                            <Avatar src={item.image}  />
                        </ListItemAvatar>
                        <ListItemText 
                            primary={item.name}
                        />
                        <ListItemSecondaryAction>
                            <IconButton color='primary' onClick={e=>editarCat(item)('edit')} >
                                <Edit/>
                            </IconButton>
                            <IconButton color='secondary' onClick={e=>editarCat(item)('del')}>
                                <DeleteForever/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                })
            }
        </List>
        <ModalGenerica
            modal={modal.status}
            titulo={modal.title}
            botonesAccion={<Button onClick={()=>setModal({
                ...modal,
                status:false
            })} startIcon={<Close />}>cerrar</Button>}
            child={modal.edit ? <EditarCat item={modal.item} event={saveEdit} /> : <BorrarCat item={modal.item} onBorrar={handleDelete}   />}
        />
    <div style={{display:'flex',flexDirection:'row-reverse',alignItems:'end'}}>
        <Fab onClick={nuevoCat} color='secondary'  >
            <Add />
        </Fab>
    </div>
    </LayoutApp>);
}

const BorrarCat = ({item=null,onBorrar=e=>e})=>{

    return(<Fragment>
        <ListItem>
            <ListItemAvatar>
                <Avatar src={item.image}  />
            </ListItemAvatar>
            <ListItemText 
                primary={item.name}
            />
        </ListItem>
        <Button fullWidth color='secondary' startIcon={<DeleteForever />} onClick={onBorrar}>Borrar</Button>
    </Fragment>
    );
}

const EditarCat = ({
    item={
        image:'',
        name:'',
    },
    event=e=>e
}) =>{
    const [values, setValues] = useState({...item});

    return (<Card>
        <CardMedia 
            style={{height:140}}
            image={values.image}
            title={values.name}
        />
        <CardContent>
            <TextField 
                fullWidth 
                label='Link imagen'
                value={values.image}
                onChange={e=>setValues({...values,image:e.target.value})}
            />
            <TextField 
                fullWidth
                label='Nombre'
                value={values.name}
                onChange={e=>setValues({...values,name:e.target.value})}
            />
            <br />
        </CardContent>
        <CardActions>
        <Button fullWidth color='primary'onClick={()=>event(values)}  variant='contained'>Guardar</Button>
        </CardActions>
    </Card>);
}

export default Clasificaciones;