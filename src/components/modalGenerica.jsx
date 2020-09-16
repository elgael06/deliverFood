import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import React from 'react'

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

export default ModalGenerica;