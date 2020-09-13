import React, { useEffect, Fragment } from 'react';
import LayoutApp from '../components/Layout';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction, Divider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { SendRounded, LinkOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { accesos } from '../api/accesos';


const HomePage = () =>{
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(d=>d({type:'LOADING',value:false}));
    },[])

    return (<LayoutApp back={false} title='Accesos de aplicacion.'>

        <List style={{margin:'30px 5px',height:'73%',overflow:'auto'}}>
            <Divider />
            {accesos.map(item=>(<Fragment key={item.pk}>
                <ListItem button onClick={()=>history.push(item.url)}>
                    <ListItemAvatar>
                        <Avatar src={item.img} >
                            <LinkOutlined />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                        primary={item.name}
                        secondary={item.desc}
                    />
                    <ListItemSecondaryAction >
                        <SendRounded />
                    </ListItemSecondaryAction>
                </ListItem> 
                <Divider />
        </Fragment>))}</List>
    </LayoutApp>)
}

export default HomePage;