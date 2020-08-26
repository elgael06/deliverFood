import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductos } from '../actions/products';
import LayoutApp from '../components/Layout';
import { useHistory } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import { TableHead, TableRow, TableCell, TableBody, Button, TableFooter, TablePagination, Fab, IconButton, MenuList, MenuItem } from '@material-ui/core';
import {Add, Edit, Delete, ImageRounded } from '@material-ui/icons';

const HomeApp =()=>{
    const {list=[],page=1} = useSelector(state=>state.productsStore);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        console.log('home')
        list.length==0 && obtenerProductos();
    },[]);
    const obtenerProductos =()=>{
        dispatch(fetchProductos());        
    }

    return(<LayoutApp>
       <h3>home app</h3>
       <br/>
       <Table >
           <TableHead>
               <TableRow >
                   <TableCell> # </TableCell>
                   <TableCell>Image</TableCell>
                   <TableCell> NOMBRE </TableCell>
                   <TableCell> COSTO </TableCell>
                   <TableCell> PRECIO </TableCell>
                   <TableCell>ACCIONES</TableCell>
               </TableRow>
           </TableHead>
           <TableBody>
               { list.map(e=>{
                   let id = e.pk.toString();
                   while(id.length<6){
                       id = '0'+ id;
                   }
                   return(<TableRow key={e.pk}>
                       <TableCell>{id}</TableCell>
                       <TableCell> { e.image ? <img style={{height:45,width:45,borderRadius:100}} src={e.image} /> : <ImageRounded fontSize='45px' /> }</TableCell>
                       <TableCell>{e.nombre}</TableCell>
                       <TableCell>{e.costo}</TableCell>
                       <TableCell>{e.price}</TableCell>
                       <TableCell>
                           <IconButton onClick={()=>history.push(`edit/${e.pk}`)}>
                                <Edit /> 
                            </IconButton>
                           <IconButton disabled onClick={()=>history.push(`edit/${e.pk}`)}>
                                <Delete color='red' /> 
                            </IconButton>
                        </TableCell>
                   </TableRow>);
               })}
           </TableBody>
           <TableFooter>
                <TablePagination 
                    page={page}
                    count={list.length}
                    rowsPerPage={15}
                    color='primary'
                    rowsPerPageOptions={{

                    }}
                />
           </TableFooter>
       </Table>
       <Fab
            color='primary'
            href='/add'
            style={{
                position:'absolute',
                float:'right',
                right:10,
                bottom:10
            }}
       >
           <Add  />
       </Fab>
    </LayoutApp>);
}


export default HomeApp;