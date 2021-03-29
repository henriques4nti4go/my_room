import InterfaceReducer from './InterfaceReducer';

const InitialState:{
    user_access_token:string
} = {
    user_access_token: ''
};

const Reducer = (state:any = InitialState, action:InterfaceReducer) => {
    switch (action.type) {
        case 'USER_ACCESS_TOKEN':
            state.user_access_token  =  action.payload.user_access_token;
            break;
    }
    return state;
}

export default Reducer;