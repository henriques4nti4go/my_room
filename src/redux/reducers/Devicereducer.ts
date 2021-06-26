const initialState:{
    device_theme:string,
    saveInformations:boolean
} = {
    device_theme: '',
    saveInformations:false,
}

const Reducer = (state = initialState, action:any) => {
    
    switch (action.type) {
        case 'APP_THEME':
            console.log(action)
            state.device_theme = action.payload.theme;
            break;
    
        default:
            return state;
    }
}

export default Reducer;