
import { REACT_APP_RENT_INFO } from '../config';

export const FETCH_RENT_INFO_START = 'FETCH_RENT_INFO_START';
export const FETCH_RENT_INFO_SUCCESS = 'FETCH_RENT_INFO_SUCCESS';
export const FETCH_RENT_INFO_ERROR = 'FETCH_RENT_INFO_ERROR';

export function fetchRentInfo() {
    return dispatch => {
        dispatch({
            type: FETCH_RENT_INFO_START
        });

        fetch(REACT_APP_RENT_INFO + `${localStorage.getItem("googleAccessToken")}`, {
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
            return result.json()
            }).then(data => { 
                dispatch({
                    type: FETCH_RENT_INFO_SUCCESS,
                    payload: data.batch.entityResults
                });
            }).catch((err) => {
            dispatch({
                type: FETCH_RENT_INFO_ERROR,
                payload: err
            });
        });
    };
}
