import { combineReducers } from 'redux';
import UserReducer from './reducers/UserReducer';
import ProfileUserReducer from './reducers/ProfileUserReducer';
import RoomReduces from './reducers/RoomReducer';
import DeviceReducer from './reducers/Devicereducer';
const Reducers = combineReducers({
    user: UserReducer,
    profile_user: ProfileUserReducer,
    room: RoomReduces,
    device: DeviceReducer
})

export default Reducers; 