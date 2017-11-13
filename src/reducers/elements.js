import {
    FETCH_RENT_INFO_SUCCESS,
    FETCH_RENT_INFO_ERROR,
    DELETE_SUCCESS,
    DELETE_ERROR,
    SAVE_SUCCESS
} from '../actions/elements';



const defaultState = {
    started: false,
    success: false,
    fetchError: false,
    deleteError: false,
    saveSuccess: false,
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
        case DELETE_ERROR:
            return {
                ...state,
                deleteError: true,
            }
        case SAVE_SUCCESS:
            return {
                ...state,
                saveSuccess: true
            }    
        default:
            return state;
    }
}
