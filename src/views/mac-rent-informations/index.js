import React, {Component, PropTypes} from "react";
import {FormGroup, FormControl, InputGroup, Grid, Col, Row, Popover, Image, OverlayTrigger} from "react-bootstrap";
import { DatePicker, message, Button} from "antd";
import moment from 'moment';

import UserLogin from "../user-login";

import image from "../../assets/image.png";

const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';


export default class MacRentInformations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            note: "",
            id: 0,
            dateFrom: moment(),
            dateTo: moment(),
            name: '',
            code: '',
            serial: '',
            owner: '',
            fee:'',
            isSaveButtonClicked: false,
            userName: UserLogin.userName,
            macRentInformations: [],
        };
    }

        static PropTypes = {
            history: PropTypes.object,
            location: PropTypes.object,
            match: PropTypes.object,
        }

    componentDidMount (){
        if (this.props.match.params.id) {
            var url = "http://localhost:3456/mac-rent-informations/" + this.props.match.params.id;
            fetch(url)
                .then(response => response.json())
                .then(response => (
                    this.setState({id: response.id}),
                    this.setState({name: response.name }),
                    this.setState({code: response.code}),
                    this.setState({dateFrom: response.dateFrom}),
                    this.setState({dateTo: response.dateTo }),
                    this.setState({fee: response.fee }),
                    this.setState({serial: response.serial }),
                    this.setState({note: response.note}),
                    this.setState({owner: response.owner})
                    ));
        }
    }

    handleChange(date) {
        message.info('Selected Date: ' + date.toString());
        this.setState({ date });
    }

    handleSaveButton(isSaveButtonClicked, userName){
        this.setState({isSaveButtonClicked: true});
        if (this.state.name && this.state.code && this.state.dateFrom && this.state.dateTo && this.state.fee && this.state.serial && this.state.owner){
            var PostData = JSON.stringify({
                            name: this.state.name,
                            code: this.state.code,
                            dateFrom: this.state.dateFrom,
                            dateTo: this.state.dateTo,
                            serial: this.state.serial,
                            owner: this.state.owner,
                            fee: this.state.fee,
                            lastMod: this.state.lastMod,
                            note: this.state.note,
                            userName: this.state.userName,
                        })
            if(this.state.id === 0){
                fetch('http://localhost:3456/mac-rent-informations', {
                    method: "POST", 
                    body: PostData
                    }).then(() => this.props.history.push("/results"));
            } else {
                fetch(`http://localhost:3456/mac-rent-informations/${this.state.id}`, {
                    credentials: "same-origin",
                    method: "put", 
                    headers: { "Access-Control-Allow-Methods" : "*"},
                    body: PostData,
                }).then(() => this.props.history.push("/results"));
        }
        };
    }

    getInitialState() {
        return {
            value: ''
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
            <form style={{marginBottom: 20}}>
                <Grid>
                    <Row>
                        <Col xs={12} md={12}>
                            <Image src={image} responsive />
                            </Col>
                    </Row>

                    <Row className="show-grid">
                        <FormGroup validationState={!this.state.name && this.state.isSaveButtonClicked ? "error": null}>
                            <Col sm={4} style = {{marginBottom: 5}}>{"Nome"}</Col>
                            <Col sm={7}>
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
                            <Col sm={7}>
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
                        <FormGroup validationState={!this.state.dateFrom && this.state.isSaveButtonClicked ? "error": null }>
                            <Col sm={4} style = {{marginBottom: 5}}>{"Data inizio contratto"}</Col>
                            <Col sm={7}>
                                <DatePicker size={"large"}
                                format={"DD/MM/YYYY"}
                                onChange={this.handleDateFromChange.bind(this)}
                                value={moment(this.state.dateFrom)}
                                /> 
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row className="show-grid" style ={{marginBottom: 15}}>
                        <FormGroup validationState={!this.state.dateTo && this.state.isSaveButtonClicked ? "error": null }>
                            <Col style = {{marginBottom: 5}} sm={4}>{"Data termine contratto"}</Col>
                            <Col sm={7}>
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
                            <Col sm={7}>
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
                            <Col sm = {6} xs={10}>
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
                                            Persona a cui è affidato il Mac 
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
                            <Col sm={7}>
                                <FormGroup>
                                    <InputGroup>
                                        <FormControl 
                                            placeholder="Enter $$$"
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
                            <Col sm={7}>
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
                                <Button onClick={() => this.props.history.push("/results")}>Annulla</Button>
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