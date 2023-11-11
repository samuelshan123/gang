// Action Types
export const SET_GANGS = 'SET_GANGS';
export const FETCH_GANG = 'FETCH_GANG';
export const SET_MESSAGES = 'SET_MESSAGES'; // New action type for setting messages
export const ADD_MESSAGE = 'ADD_MESSAGE'; // New action type for adding a single message


// Action Creators
export const setGangs = (gangs) => ({
    type: SET_GANGS,
    payload: gangs
});

export const fetchGang = (gangId) => ({
    type: FETCH_GANG,
    payload: gangId
});

// New action creator for setting messages
export const setMessages = (gangId, messages) => ({
    type: SET_MESSAGES,
    payload: { gangId, messages }
});

// New action creator for adding a single message
export const addMessage = (gangId, message) => ({
    type: ADD_MESSAGE,
    payload: { gangId, message }
});

// export const fetchGangs = () => ({
//     type: 'FETCH_GANGS',
//     payload: gangId
// });

