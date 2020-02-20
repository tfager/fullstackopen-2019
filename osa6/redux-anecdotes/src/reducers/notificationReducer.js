const initialState = "";

const SET_NOTIFICATION = "SET_NOTIFICATION";
const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

export const setNotification = (notification) => {
    return {
        type: SET_NOTIFICATION,
        notification: notification
    };
}

export const hideNotification = (notification) => {
    return {
        type: HIDE_NOTIFICATION,
        notification: notification
    }
}

export const showNotificationTimed = (store, notification, timeout) => {
    store.dispatch(setNotification(notification));
    setTimeout( () => {
        store.dispatch(hideNotification(notification))
    }, timeout);
}

const reducer = (state = initialState, action) => {
    console.log('notification state now: ', state)
    console.log('action', action)

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