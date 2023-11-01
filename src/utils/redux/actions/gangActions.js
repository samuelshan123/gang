// Action Types
export const SET_GANGS = 'SET_GANGS';
export const FETCH_GANG = 'FETCH_GANG';

// Action Creators
export const setGangs = (gangs) => ({
    type: SET_GANGS,
    payload: gangs
});

export const fetchGang = (gangId) => ({
    type: FETCH_GANG,
    payload: gangId
});

// export const fetchGangs = () => ({
//     type: 'FETCH_GANGS',
//     payload: gangId
// });

