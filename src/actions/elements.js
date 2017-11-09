
import { REACT_APP_RENT_INFO } from '../config';
import moment from "moment";

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
                
                console.log(data);

                var elements = deserializedMacRentInformation(data.batch.entityResults);

                console.log(elements);

                //pulito passare i dati
                dispatch({
                    type: FETCH_RENT_INFO_SUCCESS,
                    payload: elements
                });
            }).catch((err) => {
            dispatch({
                type: FETCH_RENT_INFO_ERROR,
                payload: err
            });
        });
    };
}



  function  deserializedMacRentInformation(rowElements) {


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
