import {
    FETCH_RENT_START,
    FETCH_RENT_SUCCESS,
    FETCH_RENT_ERROR
} from '../actions/rentInformations';

const defaultState = {
    started: false,
    success: false,
    error: false,
    elements: []
};

export default function fetchRentInformations(state = defaultState, { type, payload }) {
    switch (type) {
        case FETCH_RENT_START:
            return {
                ...state,
                started: true
            };
        case FETCH_RENT_SUCCESS:
            return {
                ...state,
                started: false,
                error: false,
                data: payload.batch.entityResults
            };
        case FETCH_RENT_ERROR:
            return {
                ...state,
                started: false,
                error: true
            };
        default:
            return state;
    }
}
