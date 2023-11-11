const { SET_GANGS, FETCH_GANG, SET_MESSAGES, ADD_MESSAGE } = require("../actions/gangActions");

const initialState = {
    gangs: [],
    fetchedGang: null,
    messages: {}, // Object to store messages for each gang
};

const gangReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GANGS:
            return {
                ...state,
                gangs: action.payload,
            };
        case FETCH_GANG:
            return {
                ...state,
                fetchedGang: action.payload,
            };
        case SET_MESSAGES:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.gangId]: action.payload.messages,
                },
            };
        case ADD_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.gangId]: [
                        ...(state.messages[action.payload.gangId] || []),
                        action.payload.message,
                    ],
                },
            };
        default:
            return state;
    }
};

export default gangReducer;
