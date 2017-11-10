
import { REACT_APP_RENT_INFO } from '../config';
import moment from "moment";


import { REACT_APP_RENT_DELETE_TOKEN } from '../config';
import { REACT_APP_RENT_DELETE } from '../config';



export const FETCH_RENT_INFO_SUCCESS = 'FETCH_RENT_INFO_SUCCESS';
export const FETCH_RENT_INFO_ERROR = 'FETCH_RENT_INFO_ERROR';


export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_ERROR = 'DELETE_ERROR';




export function fetchRentInfo() {
    return dispatch => {

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

                var elements = data.batch.moreResults === "NO_MORE_RESULTS" ? []: deserializedMacRentInformation(data.batch.entityResults);

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
    




  export function deleteElement(iden) {
      return dispatch => {

          fetch(REACT_APP_RENT_DELETE_TOKEN + `${localStorage.getItem("googleAccessToken")}`, {
              method: "POST",
              body: JSON.stringify(
                  {
                      "transactionOptions": {
                          "readWrite": {}
                      }
                  })
          }).then((res) => {
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
                  if (res.ok) {
                      return res.json()
                  }
                  else {
                      throw new Error("fallita cancellazione");
                  }    
              }).then(data => {

                  dispatch({
                      type: DELETE_SUCCESS,
                      payload: iden
                  });

              }).catch((err) => {
                  dispatch({
                      type: DELETE_ERROR,
                      payload: err
                  });
              });

              }).catch((err) => {
                  dispatch({
                      type: DELETE_ERROR,
                      payload: err
                  });
          });

      };



  }
 
