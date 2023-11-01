const { SET_GANGS, FETCH_GANG } = require("../actions/gangActions");


const initialState = {
    gangs: [],
    fetchedGang: null,
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
        default:
            return state;
    }
};

export default gangReducer;