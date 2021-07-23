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

const Reducer = (state = InitialState, action:InterfaceReducer) => {
    
    switch (action.type) {
        case 'SET_PROFILE_USER_INFORMATION':
            state.email             =   action.payload.email;
            state.name              =   action.payload.name;
            state.user_name         =   action.payload.user_name;
            state.profile_photo     =   action.payload.profile_photo;
            state.bio               =   action.payload.bio
            return {...state};
        case 'UPDATE_PROFILE_USER':
            state.name              =   action.payload.name;
            state.bio               =   action.payload.bio
            return {...state};
        case 'UPDATE_USER_NAME':
            state.user_name         =   action.payload.user_name;
            return {...state};
        case 'UPDATE_IMAGE_PROFILE':
            state.profile_photo = action.payload.uri;
        return {...state};
    }
    return {...state};
}

export default Reducer;