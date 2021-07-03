import InterfaceReducer from './InterfaceReducer';

const InitialState:{
    user_access_token:string,
    user_id: number,
    status: any,
} = {
    user_access_token: '',
    user_id: 0,
    status: ''
};

const Reducer = (state:any = InitialState, action:InterfaceReducer) => {
    switch (action.type) {
        case 'USER_ACCESS_TOKEN':
            state.user_access_token  =  action.payload.user_access_token;
            return {...state};
        case 'USER':
            state.user_id = action.payload.id; 
            state.status = action.payload.status; 
            return {...state};
    }
    return {...state};
}

export default Reducer;