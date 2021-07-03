import InterfaceReducer from './InterfaceReducer';

const InitialState:{
    room_selected?: string,
    title: string,
    description?: string,
    created_at?: Date
} = {
    room_selected: '',
    title: '',
};

const Reducer = (state = InitialState, action:InterfaceReducer) => {
    
    switch (action.type) {
        case 'ROOM_SELECTED':
            state.room_selected  =  action.payload.room_id;
            state.title  =  action.payload.title;
            state.description  =  action.payload.description;
            state.created_at  =  action.payload.created_at;
            return {...state};
    }
    return {...state};
}

export default Reducer;