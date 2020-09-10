
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsStore, { initialProducts } from './reducers/productos.reducers';
import guiStore,{initialGui} from './reducers/gui.reducer';
import sesion, { initialSesion } from './reducers/sesion.reducer';

const reducers = combineReducers({
    guiStore,
    productsStore,
    sesion,
});

export default createStore(reducers,{
    productsStore:initialProducts,
    guiStore:initialGui,
    sesion:initialSesion
},applyMiddleware(thunk));