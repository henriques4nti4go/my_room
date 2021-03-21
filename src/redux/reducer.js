import { combineReducers } from 'redux';
import UserReducer from './reducers/UserReducer';
import PersonReducer from './reducers/PersonReducer';

const Reducers = combineReducers({
    user: UserReducer,
    person: PersonReducer,
})

export default Reducers; 