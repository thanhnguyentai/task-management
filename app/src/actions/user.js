import USER_ACTIONS from './userAction';

export const setUserInfoAction = function(user) {
    return {
        type: USER_ACTIONS.SET_USER_INFO,
        user: user
    }
}