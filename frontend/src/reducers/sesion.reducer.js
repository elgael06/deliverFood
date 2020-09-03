
export const initialSesion = {
    "id": 0,
    "nombre": "",
    "apeido": "",
    "email": "",
    "apodo": "",
    "token": "",
    "sesion": false,
};

export default function sesion (state=initialSesion,action){
    const data = localStorage.getItem('login_deliver_food');

    const res = data ? JSON.parse(data) : initialSesion;

    switch (action.type) {
        case 'ADD_SESION':
            localStorage.setItem('login_deliver_food',JSON.stringify(action.value));
            return {...action.value};
        case 'REMOVE_SESION':
            localStorage.removeItem('login_deliver_food');
            return initialSesion;
        default:
            return res;
    }
}


