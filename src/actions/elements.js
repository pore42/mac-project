
import { post } from "axios";

import { REACT_APP_RENT_INFO } from '../config';
import moment from "moment";


import { REACT_APP_RENT_DELETE_TOKEN } from '../config';
import { REACT_APP_RENT_DELETE } from '../config';



export const FETCH_RENT_INFO_SUCCESS = 'FETCH_RENT_INFO_SUCCESS';
export const FETCH_RENT_INFO_ERROR = 'FETCH_RENT_INFO_ERROR';


export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_ERROR = 'DELETE_ERROR';

export const SAVE_SUCCESS = 'SAVE_SUCCESS';


export function fetchRentInfo() {

       return async dispatch => {

            try {
                const result = await post(REACT_APP_RENT_INFO + `${localStorage.getItem("googleAccessToken")}`, {
                    query: {
                        kind: [
                            {
                                name: "mac-rent-information"
                            }
                        ]
                    }
                });
            
                var data = await result.data;
                console.log("ho recuperato questo ", data);
                var elements = data.batch.entityResults !== undefined ? deserializedMacRentInformation(data.batch.entityResults) : [];


                dispatch({
                    type: FETCH_RENT_INFO_SUCCESS,
                    payload: elements
                });

         } catch (error) {
                dispatch({
                    type: FETCH_RENT_INFO_ERROR,
                    payload: error
                });
            }
        };

}



function deserializedMacRentInformation(rowElements) {


    const elements = rowElements.map((el, i) =>
        ({
            id: i,
            realId: Number(el.entity.key.path[0].id),
            name: el.entity.properties.name.stringValue,
            code: el.entity.properties.code.stringValue,
            dateFrom: moment(el.entity.properties.dateFrom.timestampValue),
            dateTo: moment(el.entity.properties.dateTo.timestampValue),
            serial: el.entity.properties.serial.stringValue,
            owner: el.entity.properties.owner.stringValue,
            fee: el.entity.properties.fee.integerValue,
            lastMod: el.entity.properties.lastMod.stringValue,
            note: el.entity.properties.note.stringValue,
        }));

    return elements;

}





export function deleteElement(iden, token) {
    return async dispatch => {

        try {
            const result = await post(REACT_APP_RENT_DELETE_TOKEN + `${localStorage.getItem("googleAccessToken")}`, {
                "transactionOptions": {
                    "readWrite": {}
                }
            });

            await post(REACT_APP_RENT_DELETE + `${localStorage.getItem("googleAccessToken")}`, {
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
                "transaction": result.data.transaction
            });

            dispatch({
                type: DELETE_SUCCESS,
                payload: iden
            });

        } catch (error) {
            dispatch({
                type: DELETE_ERROR,
                payload: error
            })
        }
    };
}


export function saveElement(userName, id, name, code, dateFrom, dateTo, fee, serial, note, owner, history) {

    return async dispatch => {
        try {
            var modifyElement =
                id !== 0 ? {
                    kind: "mac-rent-information",
                    id: id
                } :
                    {
                        kind: "mac-rent-information"
                    }
                ;

            const result = await post(`https://datastore.googleapis.com/v1/projects/mac-rent-informations:commit?access_token=${localStorage.getItem("googleAccessToken")}`, {
                "mode": "NON_TRANSACTIONAL",
                "mutations": [
                    {
                        "upsert": {
                            "key": {
                                "partitionId": {
                                    "projectId": "mac-rent-informations"
                                },
                                "path": [
                                    modifyElement
                                ]
                            },
                            "properties": {

                                "name": {
                                    "stringValue": name
                                },
                                "code": {
                                    "stringValue": code
                                },
                                "dateFrom": {
                                    "timestampValue": dateFrom
                                },
                                "dateTo": {
                                    "timestampValue": dateTo
                                },
                                "fee": {
                                    "integerValue": fee
                                },
                                "serial": {
                                    "stringValue": serial === "" ? "-" : serial
                                },
                                "note": {
                                    "stringValue": note === "" ? "-" : note
                                },
                                "owner": {
                                    "stringValue": owner === "" ? "-" : owner
                                },
                                "lastMod": {
                                    "stringValue": localStorage.getItem("userName")
                                },
                            }
                        }
                    }
                ]
            });


            if (result !== undefined) {
                dispatch({
                    type: SAVE_SUCCESS,
                });
            }

            history.push(`/results/`);

        } catch (error) {
            dispatch({
                type: SAVE_ERROR,
                payload: error
            });
        }
    }    
}

