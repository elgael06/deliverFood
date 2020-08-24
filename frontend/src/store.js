
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsStore, { initialProducts } from './reducers/productos.reducers';

const reducers = combineReducers({
    productsStore,
});

export default createStore(reducers,{
    productsStore:initialProducts
},applyMiddleware(thunk));