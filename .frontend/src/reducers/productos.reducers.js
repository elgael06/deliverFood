
export const initialProducts = {
    list:[],
    selected:null,
    page:1
} 

const productsStore = (state=initialProducts,actions) =>{
    switch (actions.type) {
        case 'ADD_PRODUCTS':
            return {
                ...state,
                list:actions.value,
                page:actions.page,
            }
        case 'SELECT_PRODUCT':
            return {
                ...state,
                selected:actions.value
            }    
        default:
            return state;
    }
}

export default productsStore;
