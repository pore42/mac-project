import React, {Component, PropTypes} from "react";
import {FormGroup, FormControl, InputGroup, Navbar, Jumbotron, Grid, Col, Row, Popover, Image, OverlayTrigger, ControlLabel} from "react-bootstrap";
import { DatePicker, message, Button} from "antd";

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
                                <Image src={require("/Users/macbookadmin/Desktop/progetto-computer/mac-summary-project/src/assets/image.png")} responsive />
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
                                    <form>
                                        <FormGroup controlId="formBasicText">
                                            <FormControl type="text"
                                                placeholder="Enter code"
                                                onChange={e => this.setState({code: e.target.value})}
                                                value={this.state.code}
                                            />
                                            <FormControl.Feedback />
                                        </FormGroup>
                                    </form>
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
                                        <DatePicker 
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
                                            format={"DD-MM-YYYY"}
                                            onChange={e => this.setState({dateTo: e})}
                                            value={this.state.dateTo}
                                        />
                                        <br />
                                    </Col>
                                </FormGroup>
                            </Row>
                        </div>

                        <Row className="show-grid">
                            <FormGroup validationState={(this.state.model == '' || this.state.model == "other") && this.state.isSaveButtonClicked ? "error": "null" }>
                                <div style = {{marginBottom: 5}}>
                                    <Col sm={4}>{"Modello Mac"}</Col>
                                </div>
                                <Col sm={7}>
                                        <form>
                                            <FormGroup controlId="formControlsSelect">
                                            <FormControl componentClass="select"
                                                placeholder="select"
                                                onChange={e => this.setState({model: e.target.value})}
                                                value={this.state.model}
                                                >
                                                <option value="other">other</option> 
                                                <option value="MacPro2017">MacBook Pro 2015</option>
                                                <option value="MacPro2017">MacBook Pro 2017</option>
                                            </FormControl>
                                        </FormGroup>
                                    </form>
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
                                        <form>
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
                                    </form>
                                </Col>
                            </FormGroup>
                        </Row>

                        <Row className="show-grid">
                            <FormGroup>
                                <div style = {{marginBottom: 5}}>
                                    <Col sm={4}>{"Note"}</Col>
                                </div>
                                <Col sm={7}>
                                        <form>
                                        <FormGroup controlId="formControlsTextarea">
                                            <FormControl componentClass="textarea" placeholder="Insert note here" />
                                        </FormGroup>
                                    </form>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row className="show-grid">
                            <div style = {{marginBottom: 5}}>
                                <Col sm={2} smOffset={5} xs={4} xsOffset={1}>
                                    <Button>Annulla</Button>
                                 </Col>
                            </div>
                            <Col sm={1} xs={1}>
                                    <Button type="primary" onClick={sSaveButtonClicked => this.setState({isSaveButtonClicked: true})}> Salva </Button>
                            </Col>
                        </Row>
                    </Grid>
                </form>
            </div>
        );
    }

}