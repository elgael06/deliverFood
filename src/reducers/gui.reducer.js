export const initialGui ={
    loadding :true,
    modal:false
}

const guiStore = (state = initialGui,action) =>{
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loadding:action.value
            };
        case 'MODAL':
            return {
                ...state,
                modal:action.value
            }
        default:
            return state;
    }
}

export default guiStore;