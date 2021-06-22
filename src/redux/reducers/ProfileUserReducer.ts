import InterfaceReducer from './InterfaceReducer';

const InitialState:{
    email:string,
    profile_photo:string,
    name:string,
    user_name:string,
    city:string,
    country:string,
    district:string,
    bio:string
} = {
    email:'',
    profile_photo:'',
    name:'',
    user_name:'',
    city:'',
    country:'',
    district:'',
    bio: '',
};

const Reducer = (state:any = InitialState, action:InterfaceReducer) => {
    
    switch (action.type) {
        case 'USER_ACCESS_TOKEN':

            state.user_access_token  =  action.payload.user_access_token;
            break;
        case 'SET_PROFILE_USER_INFORMATION':
            state.email             =   action.payload.email;
            state.name              =   action.payload.name;
            state.user_name         =   action.payload.user_name;
            state.profile_photo     =   action.payload.profile_photo;
            state.bio               =   action.payload.bio
            break;
        case 'UPDATE_PROFILE_USER':
            state.name              =   action.payload.name;
            state.bio               =   action.payload.bio
            break;
        case 'UPDATE_USER_NAME':
            state.user_name         =   action.payload.user_name;
            break;
    }
    return state;
}

export default Reducer;