import {
    FETCH_RENT_INFO_START,
    FETCH_RENT_INFO_SUCCESS,
    FETCH_RENT_INFO_ERROR
} from '../actions/elements';


import {
    DELETE_SUCCESS,
    DELETE_ERROR
} from '../actions/delete';


const defaultState = {
    started: false,
    success: false,
    error: false,
    data: []
};

export default function elements(state = defaultState, { type, payload }) {
    switch (type) {
        case FETCH_RENT_INFO_START:
            return {
                ...state,
                started: true
            };
        case FETCH_RENT_INFO_SUCCESS:
            return {
                ...state,
                started: false,
                error: false,
                data: payload
            };
        case FETCH_RENT_INFO_ERROR:
            return {
                ...state,
                started: false,
                error: true
            };
        case DELETE_SUCCESS:
            return{ 
                ...state,
                data: state.data.filter(x => x.realId !== payload)
            }   
        default:
            return state;
    }
}
