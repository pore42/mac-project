
import { post } from "axios";

import { REACT_APP_RENT_INFO } from '../config';
import moment from "moment";


import { REACT_APP_RENT_DELETE_TOKEN } from '../config';
import { REACT_APP_RENT_DELETE } from '../config';
import { REACT_APP_RENT_SAVE } from '../config';
import { REACT_APP_FETCH_ELEMENT } from '../config';



export const FETCH_RENT_INFO_SUCCESS = 'FETCH_RENT_INFO_SUCCESS';
export const FETCH_RENT_INFO_ERROR = 'FETCH_RENT_INFO_ERROR';


export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_ERROR = 'DELETE_ERROR';

export const SAVE_SUCCESS = 'SAVE_SUCCESS';
export const SAVE_ERROR = 'SAVE_ERROR';


export const FETCH_ROW_SUCCESS = 'FETCH_ROW_SUCCESS';
export const FETCH_ROW_ERROR = 'FETCH_ROW_ERROR';


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

   rowElements.forEach(el => console.log(el.entity.properties.deleted.booleanValue) );


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
            deleted: el.entity.properties.deleted.booleanValue,
        }));

    return elements;

}





export function deleteElement(iden, name, code, dateFrom, dateTo, fee, serial, note, owner, deleted) {
    return async dispatch => {

        // try {
        //     const result = await post(REACT_APP_RENT_DELETE_TOKEN + `${localStorage.getItem("googleAccessToken")}`, {
        //         "transactionOptions": {
        //             "readWrite": {}
        //         }
        //     });

        //     await post(REACT_APP_RENT_DELETE + `${localStorage.getItem("googleAccessToken")}`, {
        //         "mode": "MODE_UNSPECIFIED",
        //         "mutations": [
        //             {
        //                 "delete": {
        //                     "path": [
        //                         {
        //                             "kind": "mac-rent-information",
        //                             "id": iden,
        //                         }
        //                     ]
        //                 }
        //             }
        //         ],
        //         "transaction": result.data.transaction
        //     });

        //     dispatch({
        //         type: DELETE_SUCCESS,
        //         payload: iden
        //     });

        // // } catch (error) {
        //     dispatch({
        //         type: DELETE_ERROR,
        //         payload: error
        //      })
        // }

        console.log("questo è l'id", iden);

        try{
        var modifyElement =
                {
                    kind: "mac-rent-information",
                    id: iden
                };

        const result = await post(REACT_APP_RENT_SAVE + `${localStorage.getItem("googleAccessToken")}`, {
            "mode": "NON_TRANSACTIONAL",
            "mutations": [
                {
                    "update": {
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
                            "deleted": {
                                "booleanValue": false
                            }
                        }
                    }
                }
            ]
        });

            dispatch({
                type: DELETE_SUCCESS,
            });


        } catch (error) {
            dispatch({
                type: DELETE_ERROR,
                payload: error
            });
        }




    };
}


export function saveElement(id, name, code, dateFrom, dateTo, fee, serial, note, owner, deleted) {

    return async dispatch => {
        try {

            var modifyElement;
            if (id !== 0 ){
                modifyElement =
                    {
                        kind: "mac-rent-information",
                        //id: id
                    };
            } else {
                modifyElement =
                    {
                        kind: "mac-rent-information"
                    };
                
                deleted = true;
            }


            console.log("salvo con questo deleted", deleted);

            const result = await post(REACT_APP_RENT_SAVE + `${localStorage.getItem("googleAccessToken")}`, {
                "mode": "NON_TRANSACTIONAL",
                "mutations": [
                    {
                        "insert": {
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
                                "deleted": {
                                    "booleanValue": deleted
                                }
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

            
        } catch (error) {
            dispatch({
                type: SAVE_ERROR,
                payload: error
            });
        }
    }    
}



export function fetchRow(id) { 
    
    return async dispatch => {
        try {
            console.log("questo è l'id", id);

                const result = await post(REACT_APP_FETCH_ELEMENT + `${localStorage.getItem("googleAccessToken")}`, {
                    "keys": [
                        {
                            "path": [
                                {
                                    "id": id !== 0 ? id : 0,
                                    "kind": "mac-rent-information"
                                }
                            ]
                        }
                    ]
                });
                console.log(result.data);
                
                var r = result.data.found[0].entity.properties;

                dispatch({
                    type: FETCH_ROW_SUCCESS,
                    payload: {
                        id: id,
                        name: (r.name) ? r.name.stringValue : "",
                        code: (r.code) ? r.code.stringValue : "",
                        dateFrom: (r.dateFrom) ? moment(r.dateFrom.timestampValue) : moment(),
                        dateTo: (r.dateTo) ? moment(r.dateTo.timestampValue) : moment(),
                        fee: (r.fee) ? r.fee.integerValue : "",
                        serial: (r.serial) ? r.serial.stringValue : "",
                        note: (r.note) ? r.note.stringValue : "",
                        owner: (r.owner) ? r.owner.stringValue : "",
                        deleted: (r.deleted !== undefined) ? r.deleted.booleanValue : undefined,
                    }
                });

        } catch (error) { 
            dispatch({
                type: FETCH_ROW_ERROR,
                payload: {
                    id: 0,
                    name: "",
                    code: "",
                    dateFrom: moment(),
                    dateTo: moment(),
                    fee: "",
                    serial: "",
                    note: "",
                    owner: "",
                    deleted: "undefined",
                }

            });
        }
    }
}

