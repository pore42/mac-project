import React, {Component} from "react";
import {FormGroup, FormControl, InputGroup, Grid, Col, Row, Popover, Image, OverlayTrigger} from "react-bootstrap";
import moment from "moment";
import PropTypes from "prop-types";


import image from "../../assets/images/image.png";

var Button = require("antd/lib/button");
var DatePicker = require("antd/lib/date-picker");
var message = require("antd/lib/message");


export default class MacRentInformations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            note: "",
            id: 0,
            dateFrom: moment(),
            dateTo: moment(),
            name: "",
            code: "",
            serial: "",
            owner: "",
            fee: "",
            isSaveButtonClicked: false,
            userName: localStorage.getItem("userName"),
            macRentInformations: [],
        };
    }

    static PropTypes = {
        match: PropTypes.object,
    }

    componentDidMount() {
        console.log("get token from google");
        fetch(`https://datastore.googleapis.com/v1/projects/mac-rent-informations:runQuery?access_token=${localStorage.getItem("googleAccessToken")}`, {
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
        }).then(res => res.json()
            ).then(data => {
                console.log(data.batch.entityResults[0].entity.properties);

               
                //setstatus from response
                var r = data.batch.entityResults[0].entity.properties;
                    this.setState({
                        name: r.name.stringValue,
                        code: r.code.stringValue,
                        dateFrom: moment(r.dateFrom.timestampValue),
                        dateTo: moment(r.dateTo.timestampValue),
                        fee: r.fee.integerValue,
                        serial: r.serial.stringValue,
                        note: r.note.stringValue,
                        owner: r.owner.stringValue,
                        dateFromOk: true,
                        dateToOk: true,
                    });

            });
       /* fetch(`https://datastore.googleapis.com/v1/projects/mac-rent-informations:commit?access_token=${localStorage.getItem("googleAccessToken")}`, {
            method: "POST",
            body: JSON.stringify({
                "transaction": null,
                "mode": "NON_TRANSACTIONAL",
                "mutations": [
                    {
                        "upsert": {
                            "key": {
                                "partitionId": {
                                    "projectId": "mac-rent-informations"
                                },
                                "path": [
                                    {
                                        "kind": "mac-rent-information"
                                    }
                                ]
                            },
                            "properties": {
                                "name": {
                                    "stringValue": "car"
                                },
                                "code": {
                                    "stringValue": "123prova"
                                },
                                "dateFrom": {
                                    "timestampValue": new Date()
                                },
                                "dateTo": {
                                    "timestampValue": new Date()
                                },
                                "fee": {
                                    "integerValue": "123"
                                },
                                "serial": {
                                    "stringValue": "serialeserio"
                                },
                                "note": {
                                    "stringValue": "eventualinote"
                                },
                                "owner": {
                                    "stringValue": "proprietario remoto"
                                },
                                "name": {
                                    "stringValue": "react-app"
                                }
                            }
                        }
                    }
                ]
            })
        }).then(res => {
            if (!res.ok)
                throw new Error("errore in fase di salvataggio");
            else {
                alert("Salvataggio effettuato con successo");

            }
            }
        ).catch((error) => {
            alert("salvataggio andato male male");
            console.error(error);
            //window.location = "/";
        });*/

        
    }

    handleChange(date){
        message.info("Selected Date: " + date.toString());
        this.setState({ date });
    }

    handleSaveButton(isSaveButtonClicked, userName){
        this.setState({isSaveButtonClicked: true});
        if (this.state.name && this.state.code && this.state.dateFromOk && this.state.dateToOk && this.state.fee && this.state.serial && this.state.owner){
            var PostData = JSON.stringify({
                            name: this.state.name,
                            code: this.state.code,
                            dateFrom: this.state.dateFrom,
                            dateTo: this.state.dateTo,
                            serial: this.state.serial,
                            owner: this.state.owner,
                            fee: this.state.fee,
                            note: this.state.note,
                            lastMod: this.state.userName,
                        })
            if(this.state.id === 0){
                fetch("http://localhost:3456/mac-rent-informations", {
                    method: "POST", 
                    body: PostData
                    }).then(() => this.props.history.push(`/results/${this.state.userName}`));
            } else {
                fetch(`http://localhost:3456/mac-rent-informations/${this.state.id}`, {
                    method: "POST", 
                    body: PostData,
                }).then(() => this.props.history.push(`/results/${this.state.userName}`));
        }
    }
    }

    getInitialState() {
        return {
            value: ""
        };
    }

    handleDateFromChange(date, dateString){
        this.setState(state => {
        state.dateFrom= date;
            }, ()=>{
                this.setState({ dateFromOk: (this.state.dateFrom ? true : false)  });
            });
    }
    handleDateToChange(date, dateString){
        this.setState(state => {
        state.dateTo= date;
            }, ()=>{
                this.setState({ dateToOk: (this.state.dateTo ? true: false) });
            });
    }

    render () {
        return (
            <form style={{marginBottom: 20, padding: 50}}>
                <Grid>
                    <Row>
                        <Col xs={12} md={12} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Image src={image} responsive />
                            </Col>
                    </Row>

                    <Row className="show-grid">
                        <FormGroup validationState={!this.state.name && this.state.isSaveButtonClicked ? "error": null}>
                            <Col sm={4} style = {{marginBottom: 5}}>{"Nome"}</Col>
                            <Col sm={8}>
                                <FormGroup controlId="formBasicText" >
                                    <FormControl type="text"
                                        placeholder="Enter name"
                                        onChange={e => this.setState({ name: e.target.value })}
                                        value={this.state.name}
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row className="show-grid">
                        <FormGroup validationState={!this.state.code && this.state.isSaveButtonClicked ? "error": null }>
                            <Col sm={4}style = {{marginBottom: 5}}>{"Codice Contratto"}</Col>
                            <Col sm={8}>
                                <FormGroup controlId="formBasicText">
                                    <FormControl type="text"
                                        placeholder="Enter code"
                                        onChange={e => this.setState({ code: e.target.value })}
                                        value={this.state.code}                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row className="show-grid" style ={{marginBottom: 15}}>
                        <FormGroup validationState={!this.state.dateFromOk && this.state.isSaveButtonClicked ? "error": null }>
                            <Col sm={4} style = {{marginBottom: 5}}>{"Data inizio contratto"}</Col>
                            <Col sm={8}>
                                <DatePicker size={"large"}
                                format={"DD/MM/YYYY"}
                                onChange={this.handleDateFromChange.bind(this)}
                                value={moment(this.state.dateFrom)}
                                /> 
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row className="show-grid" style ={{marginBottom: 15}}>
                        <FormGroup validationState={!this.state.dateToOk && this.state.isSaveButtonClicked ? "error": null }>
                            <Col style = {{marginBottom: 5}} sm={4}>{"Data termine contratto"}</Col>
                            <Col sm={8}>
                                <DatePicker 
                                    size={"large"}
                                    format={"DD/MM/YYYY"}
                                    onChange={this.handleDateToChange.bind(this)}
                                    value={moment(this.state.dateTo)}
                                />
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row className="show-grid">
                        <FormGroup validationState={!this.state.serial && this.state.isSaveButtonClicked ? "error": null }>
                            <Col sm={4} style = {{marginBottom: 5}}>{"Numero di serie"}</Col>
                            <Col sm={8}>
                                <FormGroup controlId="formBasicText">
                                    <FormControl type="text"
                                            placeholder="Enter serial"
                                            onChange={e => this.setState({ serial: e.target.value })}
                                            value={this.state.serial}
                                        />
                                        <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row className="show-grid">
                        <FormGroup validationState={!this.state.owner && this.state.isSaveButtonClicked ? "error": null }>
                            <Col sm={4} style = {{marginBottom: 5}}>{"Owner"}</Col>
                            <Col sm = {7} xs={10}>
                                <FormGroup controlId="formBasicText" >
                                    <FormControl type="text"
                                            placeholder="Enter name"
                                            onChange={e => this.setState({ owner: e.target.value })}
                                            value={this.state.owner}
                                        />
                                        <FormControl.Feedback />
                                </FormGroup>
                            </Col>
                            <Col sm = {1} xs={1}>
                                <OverlayTrigger trigger="click" placement="top" overlay={
                                    <Popover id="popover-positioned-right" title="info">
                                            {"Persona a cui è affidato il Mac"}
                                    </Popover>
                                    }>
                                    <Button shape="circle" icon="info" />
                                </OverlayTrigger>
                            </Col>
                        </FormGroup>
                    </Row>
                    
                    <Row className="show-grid">
                        <FormGroup validationState={!this.state.fee && this.state.isSaveButtonClicked ? "error": null }>
                            <Col sm={4} style = {{marginBottom: 5}}>{"Rata mensile"}</Col>
                            <Col sm={8}>
                                <FormGroup>
                                    <InputGroup>
                                        <FormControl 
                                            placeholder="Enter fee"
                                            type="text"
                                            onChange={e => this.setState({ fee: e.target.value })}
                                            value={this.state.fee}
                                            />
                                            <InputGroup.Addon>€</InputGroup.Addon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={4} style = {{marginBottom: 5}}>{"Note"}</Col>
                            <Col sm={8}>
                                <FormGroup controlId="formControlsTextarea">
                                    <FormControl componentClass="textarea"
                                        placeholder="Insert note here"
                                        value={ this.state.note}
                                        onChange={e => this.setState({ note: e.target.value })}/>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row className="show-grid">
                            <Col sm={2} smOffset={5} xs={4} xsOffset={1} style = {{marginBottom: 5}}>
                                <Button onClick={() => this.props.history.push("/results/")}>Annulla</Button>
                            </Col>
                            <Col sm={1} xs={1}>
                                <Button type="primary" onClick={() =>this.handleSaveButton(this.isSaveButtonClicked, this.userName)}> Salva </Button>
                            </Col>
                    </Row>
                </Grid>
            </form>
        );
    }

}
