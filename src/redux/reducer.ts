import { combineReducers } from 'redux';
import UserReducer from './reducers/UserReducer';


const Reducers = combineReducers({
    user: UserReducer,
})

export default Reducers; 