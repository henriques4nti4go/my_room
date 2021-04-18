import { combineReducers } from 'redux';
import UserReducer from './reducers/UserReducer';
import ProfileUserReducer from './reducers/ProfileUserReducer';


const Reducers = combineReducers({
    user: UserReducer,
    profile_user: ProfileUserReducer
})

export default Reducers; 