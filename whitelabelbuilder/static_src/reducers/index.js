import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import users from './users';
import tasks from './tasks';


export default combineReducers({
    routerReducer,
    users,
    tasks,
});
