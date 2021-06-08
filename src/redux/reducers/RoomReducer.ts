import InterfaceReducer from './InterfaceReducer';

const InitialState:{
    room_selected?: string
} = {
    room_selected: ''
};

const Reducer = (state = InitialState, action:InterfaceReducer) => {
    
    switch (action.type) {
        case 'ROOM_SELECTED':
            state.room_selected  =  action.payload.room_selected;
            break;
    }
    return state;
}

export default Reducer;