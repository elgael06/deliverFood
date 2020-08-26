
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsStore, { initialProducts } from './reducers/productos.reducers';
import guiStore,{initialGui} from './reducers/gui.reducer';

const reducers = combineReducers({
    guiStore,
    productsStore,
});

export default createStore(reducers,{
    productsStore:initialProducts,
    guiStore:initialGui
},applyMiddleware(thunk));