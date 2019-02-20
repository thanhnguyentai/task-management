import USER_ACTIONS from '../actions/userAction';

export default function(state = {}, action) {
    switch(action.type) {
        case USER_ACTIONS.SET_USER_INFO:
            return action.user;
        default:
            return state;
    }
}