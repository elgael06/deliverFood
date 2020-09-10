import React, { useEffect, useState, Fragment } from 'react';
import LayoutApp from '../components/Layout';
import { useDispatch } from 'react-redux';
import { getUsuarios, accesos } from '../api/accesos';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Divider, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, Card, ListItemIcon } from '@material-ui/core';
import { Send, Settings, CloseSharp, ArrowForward, ArrowBack } from '@material-ui/icons';
import Checkbox from '@material-ui/core/Checkbox';

const AccessControl = () => {
    const dispatch = useDispatch();
    const [usuarios, setusuarios] = useState([]);
    const [open,setOpen] = useState(false);
    const [selected,setSelected] = useState({
        nombre: "",
        apeido: "",
        apodo: "",
        email: "",
        id: 0,
    });

    useEffect(()=>{
        dispatch(d=>d({type:'LOADING',value:true}));
        fetchUsuarios();
    },[]);
    const fetchUsuarios = async () =>{
        const datos = await getUsuarios();
        setusuarios(datos);

        dispatch(d=>d({type:'LOADING',value:false}));
    }
    const selectUsuario = (usuario) => {
        setOpen(true);
        setSelected({...usuario});
    }

    return(<LayoutApp title='Control de Acceso.'>

        <List style={{height:'85%'}}>
            <Divider />
            {usuarios.map(item=>{
                return <Fragment key={item.id}>
                    <ListItem button onClick={()=>selectUsuario(item)}>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText 
                            primary={`${item.nombre} ${item.apeido} (${item.apodo})`}
                            secondary={`${item.email}`}
                        />
                        <ListItemSecondaryAction>
                            <Settings />
                            <Send />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                </Fragment>
            })}
        </List>

        <ModalAccesos
            open={open}
            setOpen={setOpen}
            nombre={`${selected.nombre} ${selected.apeido} (${selected.apodo})`}
            correo={selected.email}
            idUsuario={selected.id}
        />
        
    </LayoutApp>)
}

const ModalAccesos = ({
    idUsuario   = 0,
    nombre      = '',
    correo      = '',
    open        = false,
    setOpen     = e=>e
})=>{
    const [controlAccesos,setAccesos] = useState(accesos);
    const [activos,setActivos] = useState([]);

    const select = item =>{
        
    } 

    return(<Dialog open={open}>

        <DialogTitle> 
            <label>Accesos usuario</label>
        </DialogTitle>
        <DialogContent>

            <ListItem >
                <ListItemAvatar>
                    <Avatar />
                </ListItemAvatar>
                <ListItemText primary={nombre} secondary={correo} />
            </ListItem>

        </DialogContent>
        <DialogContent>
            <div style={{display:'flex'}}>
                <DialogTitle style={{flex:1}}>
                    Accesos
                </DialogTitle>
                <DialogTitle style={{flex:1}}>
                    Activos
                </DialogTitle>
            </div>
            <Card style={{display: 'flex',height:' 400px'}}>
                <List style={{overflow:'auto'}}>
                    {controlAccesos.map(item=>{
                        return (<Fragment key={item.id}>
                            <ListItem button onClick={()=>select(item)}>
                                <ListItemIcon >
                                    <Checkbox />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={`${item.name}.`}
                                    secondary={`${item.url}`}
                                />
                            </ListItem>
                            <Divider />
                        </Fragment>)
                    })}
                </List>
                <div style={{
                    margin:20,
                    display:'flex',
                    alignItems:'center',
                    flexDirection:'column',
                    justifyContent:'center'
                
                }}>
                    <IconButton>
                        <ArrowForward />
                    </IconButton>

                    <IconButton>
                        <ArrowBack />
                    </IconButton>
                </div>
                <List  style={{overflow:'auto'}}>
                    {controlAccesos.map(item=>{
                        return (<Fragment key={item.id}>
                            <ListItem button onClick={()=>select(item)}>
                                <ListItemIcon >
                                    <Checkbox />
                                </ListItemIcon>
                                <ListItemText 
                                    primary={`${item.name}.`}
                                    secondary={`${item.desc}`}
                                />
                            </ListItem>
                            <Divider />
                        </Fragment>)
                    })}
                </List>
            </Card>
        </DialogContent>
        
        <DialogActions>
            <Button color='inherit' onClick={()=>setOpen(false)} startIcon={<CloseSharp />} >Salir</Button>
        </DialogActions>
        
    </Dialog>);
}

export default AccessControl;