
import { REACT_APP_RENT_DELETE_TOKEN } from '../config';
import { REACT_APP_RENT_DELETE } from '../config';

export const FETCH_DELETE_TOKEN_START = 'FETCH_DELETE_TOKEN_START';
export const FETCH_DELETE_TOKEN_SUCCESS = 'FETCH_DELETE_TOKEN_SUCCESS';
export const FETCH_DELETE_TOKEN_ERROR = 'FETCH_DELETE_TOKEN_ERROR';


export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_ERROR = 'DELETE_ERROR';



export function deleteElement(iden) {
    return dispatch => {
        dispatch({
            type: FETCH_DELETE_TOKEN_START
        });


        fetch(REACT_APP_RENT_DELETE_TOKEN + `${localStorage.getItem("googleAccessToken")}`, {
            method: "POST",
            body: JSON.stringify(
                {
                    "transactionOptions": {
                        "readWrite": {}
                    }
                })
        }).then((res) => {
            dispatch({
                type: FETCH_DELETE_TOKEN_SUCCESS,
            });
            return res.json();
        }).then(data => {
            console.log("iniziata transazione numero:", data.transaction, " correttamente");

            fetch(REACT_APP_RENT_DELETE + `${localStorage.getItem("googleAccessToken")}`, {
                method: "POST",
                body: JSON.stringify(
                    {
                        "mode": "MODE_UNSPECIFIED",
                        "mutations": [
                            {
                                "delete": {
                                    "path": [
                                        {
                                            "kind": "mac-rent-information",
                                            "id": iden,
                                        }
                                    ]
                                }
                            }
                        ],
                        "transaction": data.transaction
                    })
            }).then((res) => {
                return res.json();
                }).then(data => {
                
                    
                dispatch({
                    type: DELETE_SUCCESS,
                    payload: iden
                });
                
                //this.setState({ macRentInformations: copy });

            }).catch((err) => {
                dispatch({
                    type: DELETE_ERROR,
                    payload: err
                });
            });

        }).catch((err) => {
            dispatch({
                type: FETCH_DELETE_TOKEN_ERROR,
                payload: err
            });
        });

    };



}
