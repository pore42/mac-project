import React, {Component, PropTypes} from "react";
import {FormGroup, FormControl, InputGroup, Grid, Col, Row, Popover, Image, OverlayTrigger} from "react-bootstrap";
import { DatePicker, message, Button} from "antd";

import image from "../../assets/image.png";

export default class MacRentInformations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // value: false,
            dateFrom: '',
            dateTo: '',
            name: '',
            code: '',
            serial: '',
            owner: '',
            fee:'',
            dateFromOk: false,
            dateToOk: false,
            nameOk: false,
            codeOk: false,
            serialOk: false,
            ownerOk: false,
            feeOk: false,
            isSaveButtonClicked: false
        };
    }

    handleChange(date) {
        message.info('Selected Date: ' + date.toString());
        this.setState({ date });
    }

    handleSaveButton(isSaveButtonClicked, nameOk){
        this.setState({isSaveButtonClicked: true});
        console.log(!this.state.dateFromOk + !this.state.dateToOk + !this.state.nameOk + !this.state.codeOk + !this.state.serialOk + !this.state.ownerOk + !this.state.feeOk);
        if((!this.state.dateFromOk + !this.state.dateToOk + !this.state.nameOk + !this.state.codeOk + !this.state.serialOk + !this.state.ownerOk + !this.state.feeOk) == false){
            this.props.history.push("/results");
        };
    }
getInitialState() {
    return {
      value: ''
    };
  }

    handleNameChange(e){
        this.setState({ name: e.target.value });
        if(this.state.name) { this.setState({nameOk: true})};
    }
    handleCodeChange(e){
        this.setState({ code: e.target.value });
        if(this.state.code) { this.setState({codeOk: true})};
    }
    handleDateFromChange(e){
        this.setState({ dateFrom: e });
        if(this.state.dateFrom){ this.setState({dateFromOk: true})};
        console.log(this.state.dateFrom);
    }
    handleDateToChange(e){
        this.setState({ dateTo: e._d });
        if(this.state.dateTo) { this.setState({dateToOk: true})};
    }
    handleSerialChange(e){
        this.setState({ serial: e.target.value });
        if(this.state.serial) { this.setState({serialOk: true})};
    }
    handleOwnerChange(e){
        this.setState({ owner: e.target.value });
        if(this.state.owner) { this.setState({ownerOk: true})};
    }
    handleFeeChange(e){
        this.setState({ fee: e.target.value });
        if(this.state.fee) { this.setState({feeOk: true})};
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
                            <FormGroup validationState={!this.state.name && this.state.isSaveButtonClicked ? "error": null }>
                                <div style = {{marginBottom: 5}}>
                                    <Col sm={4}>{"Nome"}</Col>
                                </div>
                                <Col sm={7}>
                                    <FormGroup controlId="formBasicText" >
                                        <FormControl type="text"
                                            val
                                            placeholder="Enter name"
                                            onChange={this.handleNameChange.bind(this)}
                                        />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                        </Row>

                        <Row className="show-grid">
                            <FormGroup validationState={!this.state.code && this.state.isSaveButtonClicked ? "error": null }>
                                <div style = {{marginBottom: 5}}>
                                    <Col sm={4}>{"Codice Contratto"}</Col>
                                </div>
                                <Col sm={7}>
                                    <FormGroup controlId="formBasicText">
                                        <FormControl type="text"
                                            placeholder="Enter code"
                                            onChange={this.handleCodeChange.bind(this)}
                                            value={this.state.code}
                                        />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                        </Row>

                        <div style ={{marginBottom: 15}}>
                            <Row className="show-grid">
                                <FormGroup validationState={!this.state.dateFrom && this.state.isSaveButtonClicked ? "error": null }>
                                    <div style = {{marginBottom: 5}}>
                                        <Col sm={4}>{"Data inizio contratto"}</Col>
                                    </div>
                                    <Col sm={7}>
                                        <DatePicker size={"large"}
                                        format={"DD-MM-YYYY"}
                                        onChange={this.handleDateFromChange.bind(this)}
                                        /> 
                                        <br />
                                    </Col>
                                </FormGroup>
                            </Row>
                        </div>

                        <div style ={{marginBottom: 15}}>
                            <Row className="show-grid">
                                <FormGroup validationState={!this.state.dateTo && this.state.isSaveButtonClicked ? "error": null }>
                                    <div style = {{marginBottom: 5}}>
                                        <Col sm={4}>{"Data termine contratto"}</Col>
                                        </div>
                                    <Col sm={7}>
                                        <DatePicker 
                                            size={"large"}
                                            format={"DD-MM-YYYY"}
                                            onChange={this.handleDateToChange.bind(this)}
                                            value={this.state.dateTo}
                                        />
                                    </Col>
                                </FormGroup>
                            </Row>
                        </div>

                        <Row className="show-grid">
                            <FormGroup validationState={!this.state.serial && this.state.isSaveButtonClicked ? "error": null }>
                                <div style = {{marginBottom: 5}}>
                                    <Col sm={4}>{"Numero di serie"}</Col>
                                </div>
                                <Col sm={7}>
                                    <FormGroup controlId="formBasicText">
                                        <FormControl type="text"
                                                placeholder="Enter serial"
                                                onChange={this.handleSerialChange.bind(this)}
                                            />
                                            <FormControl.Feedback />
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                        </Row>

                        <Row className="show-grid">
                            <FormGroup validationState={!this.state.fee && this.state.isSaveButtonClicked ? "error": null }>
                                <div style = {{marginBottom: 5}}>
                                    <Col sm={4}>{"Owner"}</Col>
                                </div>
                                <Col sm = {6}>
                                    <FormGroup controlId="formBasicText" >
                                        <FormControl type="text"
                                                placeholder="Enter name"
                                                onChange={this.handleFeeChange.bind(this)}
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
                            <FormGroup validationState={!this.state.owner && this.state.isSaveButtonClicked ? "error": null }>
                                <div style = {{marginBottom: 5}}>
                                    <Col sm={4}>{"Rata mensile"}</Col>
                                </div>
                                <Col sm={7}>
                                    <FormGroup>
                                        <InputGroup>
                                            <FormControl 
                                                placeholder="Enter $$$"
                                                type="text"
                                                onChange={this.handleOwnerChange.bind(this)}
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
                                    <Button type="primary" onClick={() =>this.handleSaveButton(this.isSaveButtonClicked, this.nameOk)}> Salva </Button>
                                </Col>
                        </Row>
                    </Grid>
                </form>
            </div>
        );
    }

}