import {
    FETCH_RENT_INFO_SUCCESS,
    FETCH_RENT_INFO_ERROR,
    DELETE_SUCCESS,
    DELETE_ERROR,
    SAVE_SUCCESS,
    SAVE_ERROR,
    FETCH_ROW_SUCCESS,
    FETCH_ROW_ERROR
} from '../actions/elements';



const defaultState = {
    started: false,
    success: false,
    fetchError: false,
    deleteError: false,
    saveSuccess: false,
    saveError: false,
    fetchRowSuccess: false,
    fetchRowError: false,
    fetchedElement: {},
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
        case SAVE_ERROR:
            return {
                ...state,
                saveError: true
            }
        case FETCH_ROW_SUCCESS:
            return {
                ...state,
                fetchRowSuccess: true,
                fetchedElement: payload
            }
        case FETCH_ROW_ERROR:
            return {
                ...state,
                fetchRowError: true,
                fetchedElement: payload
            }    
        default:
            return state;
    }
}
