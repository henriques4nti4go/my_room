const initialState:{
    device_theme:string,
    saveInformations:boolean
} = {
    device_theme: 'default',
    saveInformations:false,
}

const Reducer = (state:any = initialState, action:any) => {
    
    switch (action.type) {
        case 'USER_TOKEN':
            
            break;
    
        default:
            return state;
    }
}

export default Reducer;