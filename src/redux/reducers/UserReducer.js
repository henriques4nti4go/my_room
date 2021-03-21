import {
    verifyValueParsed
} from '../../helpers';
const initialState = {
    id: null,
    token: null,
    login: null,
    password: null,
    user_target: null,
    conversation_id: null,
    notification_token: null,
}

const UserReducer = (state = initialState, action) => {
    
    if (action.type === 'set_fields_auth') {
        state.id = verifyValueParsed(action.payload.id, state.id);
        state.login = verifyValueParsed(action.payload.login, state.login);
        state.password = verifyValueParsed(action.payload.password, state.password);
        state.token = verifyValueParsed(action.payload.token, state.token);
        state.user_target = verifyValueParsed(action.payload.user_target, state.user_target);
        state.notification_token = verifyValueParsed(action.payload.notification_token, state.notification_token);
        return {
            ...state
        }
    }
    
    return state;
}

export default UserReducer;