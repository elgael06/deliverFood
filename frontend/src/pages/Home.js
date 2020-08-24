import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductos } from '../actions/products';
import LayoutApp from '../components/Layout';
import Table,{ TableHead, TableRow, TableCell } from 'react-uikit/lib/components/Table';
import TableBody from 'react-uikit/lib/components/Table/TableBody';

const HomeApp =()=>{
    const {list=[],page=1} = useSelector(state=>state.productsStore);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log('home')
        dispatch(fetchProductos());
    },[]);

    return(<LayoutApp>
       <h3>home app</h3>
       <br/>
       <Table>
           <TableHead>
               <TableRow >
                   <TableCell>
                       id
                   </TableCell>
                   <TableCell>
                       nombre
                   </TableCell>
                   <TableCell>
                       consto
                   </TableCell>
                   <TableCell>
                       precio
                   </TableCell>
               </TableRow>
           </TableHead>
           <TableBody>
               { list.map(e=>{
                   return(<TableRow key={e.pk}>
                       <TableCell>{e.pk}</TableCell>
                       <TableCell>{e.nombre}</TableCell>
                       <TableCell>{e.costo}</TableCell>
                       <TableCell>{e.price}</TableCell>
                   </TableRow>);
               })}
           </TableBody>
       </Table>
    </LayoutApp>);
}


export default HomeApp;