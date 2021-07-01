import InterfaceReducer from './InterfaceReducer';

const InitialState:{
    user_access_token:string,
    user_id: number,
} = {
    user_access_token: '',
    user_id: 0,
};

const Reducer = (state:any = InitialState, action:InterfaceReducer) => {
    switch (action.type) {
        case 'USER_ACCESS_TOKEN':
            state.user_access_token  =  action.payload.user_access_token;
            return {...state};
        case 'USER_ID':
            state.user_id = action.payload.user_id; 
            return {...state};
    }
    return {...state};
}

export default Reducer;