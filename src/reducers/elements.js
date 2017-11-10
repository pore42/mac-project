import {
    FETCH_RENT_INFO_SUCCESS,
    FETCH_RENT_INFO_ERROR,
    DELETE_SUCCESS,
    DELETE_ERROR
} from '../actions/elements';



const defaultState = {
    started: false,
    success: false,
    fetchError: false,
    data: []
};

export default function elements(state = defaultState, { type, payload }) {
    switch (type) {
        case FETCH_RENT_INFO_SUCCESS:
            return {
                ...state,
                started: false,
                fetchError: false,
                data: payload
            };
        case FETCH_RENT_INFO_ERROR:
            return {
                ...state,
                started: false,
                fetchError: true
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
