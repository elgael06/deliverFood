import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductos } from '../actions/products';
import LayoutApp from '../components/Layout';
import Table,{ TableHead, TableRow, TableCell,TableBody } from 'react-uikit/lib/components/Table';
import Button from 'react-uikit/lib/components/Button';
import { useHistory } from 'react-router-dom';

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
       <Table style={{width:'100%'}}>
           <TableHead>
               <TableRow >
                   <TableCell> id </TableCell>
                   <TableCell> nombre </TableCell>
                   <TableCell> consto </TableCell>
                   <TableCell> precio </TableCell>
                   <TableCell>Actions</TableCell>
               </TableRow>
           </TableHead>
           <TableBody>
               { list.map(e=>{
                   return(<TableRow key={e.pk}>
                       <TableCell>{e.pk}</TableCell>
                       <TableCell>{e.nombre}</TableCell>
                       <TableCell>{e.costo}</TableCell>
                       <TableCell>{e.price}</TableCell>
                       <TableCell><Button onClick={()=>history.push(`edit/${e.pk}`)}>Editar</Button></TableCell>
                   </TableRow>);
               })}
           </TableBody>
       </Table>
    </LayoutApp>);
}


export default HomeApp;