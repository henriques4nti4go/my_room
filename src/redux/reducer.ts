import { combineReducers } from 'redux';
import DeviceReducer from './reducers/Devicereducer';


const Reducers = combineReducers({
    device: DeviceReducer,
})

export default Reducers; 