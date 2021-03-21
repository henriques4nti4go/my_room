import { verifyValueParsed } from "../../helpers";

const initialState = {
    name: null,
    date_of_birth: null,
    city: null,
    country: null,
    state: null,
    genre: null,
}

const Reducer = (state = initialState, action) => {
    
    if (action.type === 'set_fields_person') {
        state.name = verifyValueParsed(action.payload.name, state.name);
        state.date_of_birth = verifyValueParsed(action.payload.date_of_birth, state.date_of_birth);
        state.city = verifyValueParsed(action.payload.city, state.city);
        state.country = verifyValueParsed( action.payload.country, state.country);
        state.state = verifyValueParsed(action.payload.state, state.state);
        state.genre = verifyValueParsed(action.payload.genre, state.genre);
        return{
            ...state
        }

    }
    
    return state;
}

export default Reducer;