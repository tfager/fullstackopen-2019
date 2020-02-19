const initialState = "Initial notification again";

const SET_NOTIFICATION = "SET_NOTIFICATION";

export const setNotification = (notification) => {
    return {
        type: SET_NOTIFICATION,
        notification: notification
    };
}

const reducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case SET_NOTIFICATION:
            return action.notification;

        default:
            return state;
    }
}

export default reducer