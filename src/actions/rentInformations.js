
import { REACT_APP_GOOGLE_RENT_API } from '../config';

export const FETCH_RENT_START = 'FETCH_RENT_START';
export const FETCH_RENT_SUCCESS = 'FETCH_RENT_SUCCESS';
export const FETCH_RENT_ERROR = 'FETCH_RENT_ERROR';

export function fetchRentInfo() {
    return dispatch => {
        dispatch({
            type: FETCH_RENT_START
        });


        fetch(REACT_APP_GOOGLE_RENT_API + `{localStorage.getItem("googleAccessToken")}`, {
            method: "POST",
            body: JSON.stringify({
                query: {
                    kind: [
                        {
                            name: "mac-rent-information"
                        }
                    ]
                }
            })
        }).then(result => {
            console.log(REACT_APP_GOOGLE_RENT_API + `{localStorage.getItem("googleAccessToken")}`);
            dispatch({
                type: FETCH_RENT_SUCCESS,
                payload: result
            });
        }).catch((err) => {
            dispatch({
                type: FETCH_RENT_ERROR,
                payload: err
            });
        });
    };
}
