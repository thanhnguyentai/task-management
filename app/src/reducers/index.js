import {combineReducers} from 'redux';
import tasks, {getTasksByState} from './tasks';

export default combineReducers({
    tasks
});

export const getTasks = function(state, taskState) {
    return getTasksByState(state.tasks, taskState);
}