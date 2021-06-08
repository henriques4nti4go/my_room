import { combineReducers } from 'redux';
import UserReducer from './reducers/UserReducer';
import ProfileUserReducer from './reducers/ProfileUserReducer';
import RoomReduces from './reducers/RoomReducer';

const Reducers = combineReducers({
    user: UserReducer,
    profile_user: ProfileUserReducer,
    room: RoomReduces
})

export default Reducers; 