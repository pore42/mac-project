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
            {
                console.log("elementi che arriveranno", elements);
                return {
                    ...state,
                    data: state.data.map(x => x.realId === payload ? {
                        ...x,
                        deleted: false,
                    }: x)
                }
            }
        case DELETE_ERROR:
            return {
                ...state,
                deleteError: true,
            }
        case SAVE_SUCCESS:
            return {
                ...state,
                saveSuccess: true,
                saveError: false,
            }
        case SAVE_ERROR:
            return {
                ...state,
                saveError: true,
                saveSuccess: false,
            }
        case FETCH_ROW_SUCCESS:
            return {
                ...state,
                fetchRowError: false,
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
