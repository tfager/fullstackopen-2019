const initialState = "";

const SET_NOTIFICATION = "SET_NOTIFICATION";
const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

export const showNotification = (notification, timeout) => {
    return async (dispatch) => {
        dispatch({
            type: SET_NOTIFICATION,
            notification: notification
        });
        setTimeout( () => {
            dispatch({
                type: HIDE_NOTIFICATION,
                notification: notification
            })
        }, timeout);
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATION:
            return action.notification;

        case HIDE_NOTIFICATION:
            if (state === action.notification)
                return "";
            else return state;
        default:
            return state;
    }
}

export default reducer