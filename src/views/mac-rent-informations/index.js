import React, {Component, PropTypes} from "react";
import {FormGroup, FormControl, InputGroup, Navbar, Jumbotron, Grid, Col, Row, Popover, Image, OverlayTrigger, ControlLabel} from "react-bootstrap";
import { DatePicker, message, Button} from "antd";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import image from "../../assets/image.png";

const { MonthPicker, RangePicker } = DatePicker;

export default class MacRentInformations extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dateFrom: '',
        dateTo: '',
        name: '',
        code: '',
        model: '',
        owner: '',
        fee:'',
        dateFromOk: false,
        dateToOk: false,
        nameOk: false,
        codeOk: false,
        modelOk: false,
        ownerOk: false,
        feeOk: false,
        isSaveButtonClicked: false
    };
  }

  handleChange(date) {
    message.info('Selected Date: ' + date.toString());
    this.setState({ date });
  }

    static propTypes = {
        macModel: PropTypes.arrayOf(PropTypes.string)
    }

    static defaultProps = {
        macModel: []
    }

    render () {
        return (
            <div style={{marginBottom: 20}}>
                <form>
                    <Grid>
                        <Row>
                            <Col xs={12} md={12}>
                                <Image src={image} responsive />
                                </Col>
                        </Row>

                         <Row className="show-grid">
                            <FormGroup validationState={!this.state.name && this.state.isSaveButtonClicked ? "error": "null" }>
                                <div style = {{marginBottom: 5}}>
                                    <Col sm={4}>{"Nome"}</Col>
                                </div>
                                <Col sm={7}>
                                    <FormGroup controlId="formBasicText" >
                                        <FormControl type="text"
                                            placeholder="Enter name"
                                            onChange={e => this.setState({name: e.target.value})}
                                            value={this.state.name}
                                        />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                        </Row>

                        <Row className="show-grid">
                            <FormGroup validationState={!this.state.code && this.state.isSaveButtonClicked ? "error": "null" }>
                                <div style = {{marginBottom: 5}}>
                                    <Col sm={4}>{"Codice Contratto"}</Col>
                                </div>
                                <Col sm={7}>
                                    <FormGroup controlId="formBasicText">
                                        <FormControl type="text"
                                            placeholder="Enter code"
                                            onChange={e => this.setState({code: e.target.value})}
                                            value={this.state.code}
                                        />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                        </Row>

                        <div style ={{marginBottom: 15}}>
                            <Row className="show-grid">
                                <FormGroup validationState={!this.state.dateFrom && this.state.isSaveButtonClicked ? "error": "null" }>
                                    <div style = {{marginBottom: 5}}>
                                        <Col sm={4}>{"Data inizio contratto"}</Col>
                                    </div>
                                    <Col sm={7}>
                                        <DatePicker size={"large"}
                                        format={"DD-MM-YYYY"}
                                        onChange={e => this.setState({dateFrom: e})}
                                        value={this.state.dateFrom}
                                        /> 
                                        <br />
                                    </Col>
                                </FormGroup>
                            </Row>
                        </div>

                        <div style ={{marginBottom: 15}}>
                            <Row className="show-grid">
                                <FormGroup validationState={!this.state.dateTo && this.state.isSaveButtonClicked ? "error": "null" }>
                                    <div style = {{marginBottom: 5}}>
                                        <Col sm={4}>{"Data termine contratto"}</Col>
                                        </div>
                                    <Col sm={7}>
                                        <DatePicker 
                                            size={"large"}
                                            format={"DD-MM-YYYY"}
                                            onChange={e => this.setState({dateTo: e})}
                                            value={this.state.dateTo}
                                        />
                                    </Col>
                                </FormGroup>
                            </Row>
                        </div>

                        <Row className="show-grid">
                            <FormGroup validationState={!this.state.seriale && this.state.isSaveButtonClicked ? "error": "null" }>
                                <div style = {{marginBottom: 5}}>
                                    <Col sm={4}>{"Numero di serie"}</Col>
                                </div>
                                <Col sm={7}>
                                    <FormGroup controlId="formBasicText">
                                        <FormControl type="text"
                                                placeholder="Enter serial"
                                                onChange={e => this.setState({seriale: e.target.value})}
                                                value={this.state.seriale}
                                            />
                                            <FormControl.Feedback />
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                        </Row>

                        <Row className="show-grid">
                            <FormGroup validationState={!this.state.fee && this.state.isSaveButtonClicked ? "error": "null" }>
                                <div style = {{marginBottom: 5}}>
                                    <Col sm={4}>{"Owner"}</Col>
                                </div>
                                <Col sm = {6}>
                                    <FormGroup controlId="formBasicText" >
                                        <FormControl type="text"
                                                placeholder="Enter name"
                                                onChange={e => this.setState({fee: e.target.value})}
                                                value={this.state.fee}
                                            />
                                            <FormControl.Feedback />
                                    </FormGroup>
                                </Col>
                                <Col sm = {1}>
                                    <OverlayTrigger trigger="click" placement="top" overlay={
                                        <Popover id="popover-positioned-right" 
                                            title="info">
                                                Persona a cui è affidato il Mac 
                                        </Popover>
                                    }>
                                        <Button shape="circle" icon="info" />
                                    </OverlayTrigger>
                                </Col>
                                
                            </FormGroup>
                        </Row>
                        
                        <Row className="show-grid">
                            <FormGroup validationState={!this.state.owner && this.state.isSaveButtonClicked ? "error": "null" }>
                                <div style = {{marginBottom: 5}}>
                                    <Col sm={4}>{"Rata mensile"}</Col>
                                </div>
                                <Col sm={7}>
                                    <FormGroup>
                                        <InputGroup>
                                            <FormControl 
                                                placeholder="Enter $$$"
                                                type="text"
                                                onChange={e => this.setState({owner: e.target.value})}
                                                value={this.state.owner}
                                                />
                                                <InputGroup.Addon>€</InputGroup.Addon>
                                       </InputGroup>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                        </Row>

                        <Row className="show-grid">
                            <FormGroup>
                                <div style = {{marginBottom: 5}}>
                                    <Col sm={4}>{"Note"}</Col>
                                </div>
                                <Col sm={7}>
                                    <FormGroup controlId="formControlsTextarea">
                                        <FormControl componentClass="textarea" placeholder="Insert note here" />
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                        </Row>

                        <Row className="show-grid">
                            <div style = {{marginBottom: 5}}>
                                <Col sm={2} smOffset={5} xs={4} xsOffset={1}>
                                    <Button onClick={() => this.props.history.push("/results")}>Annulla</Button>
                                 </Col>
                            </div>
                            <Col sm={1} xs={1}>
                                <Button type="primary" onClick={isSaveButtonClicked => this.setState({isSaveButtonClicked: true})}> Salva </Button>
                            </Col>
                        </Row>
                    </Grid>
                </form>
            </div>
        );
    }

}