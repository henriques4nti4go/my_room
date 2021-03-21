const initialState:{
    device_theme:string,
    saveInformations:boolean
} = {
    device_theme: 'default',
    saveInformations:false,
}

const Reducer = (state:any = initialState, action:any) => {
    
    if (action.type === 'DEVICE_THEME') {
        action.payload.device_theme = state.device_theme;
    }
    
    return state;
}

export default Reducer;