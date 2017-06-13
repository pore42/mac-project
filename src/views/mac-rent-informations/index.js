import React, {Component, PropTypes} from "react";
import {FormGroup, FormControl, InputGroup, Navbar, Jumbotron, Button, Grid, Col, Row, Popover, Image, OverlayTrigger, ControlLabel} from "react-bootstrap";
import { DatePicker, message } from "antd";

const { MonthPicker, RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

export default class MacRentInformations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
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
                            <FormGroup>
                                <Col xs={4}>{"Nome"}</Col>
                                <Col xs={7}>
                                        <form>
                                        <FormGroup
                                                controlId="formBasicText"
                                            >
                                        <FormControl type="text"
                                                placeholder="Enter name"
                                                onChange={this.handleChange}
                                            />
                                            <FormControl.Feedback />

                                            </FormGroup>
                                        </form>
                                </Col>
                            </FormGroup>
                        </Row>

                        <Row className="show-grid">
                            <FormGroup>
                                <Col xs={4}>{"Codice Contratto"}</Col>
                                <Col xs={7}>
                                        <form>
                                        <FormGroup
                                                controlId="formBasicText"
                                            >
                                        <FormControl type="text"
                                                placeholder="Enter code"
                                                onChange={this.handleChange}
                                            />
                                            <FormControl.Feedback />

                                            </FormGroup>
                                        </form>
                                </Col>
                            </FormGroup>
                        </Row>

                        <div style ={{marginBottom: 15}}>
                            <Row className="show-grid">
                                <FormGroup>
                                    <Col xs={4}>{"Data inizio contratto"}</Col>
                                    <Col xs={7}>
                                        <DatePicker onChange={onChange} format={"DD-MM-YYYY"}/>
                                        <br />
                                    </Col>
                                </FormGroup>
                            </Row>
                        </div>

                        <div style ={{marginBottom: 15}}>
                            <Row className="show-grid">
                                <FormGroup>
                                    <Col xs={4}>{"Data termine contratto"}</Col>
                                    <Col xs={7}>
                                        <DatePicker onChange={onChange} format={"DD-MM-YYYY"}/>
                                        <br />
                                    </Col>
                                </FormGroup>
                            </Row>
                        </div>

                        <Row className="show-grid">
                            <FormGroup>
                                <Col xs={4}>{"Modello Mac"}</Col>
                                <Col xs={7}>
                                        <form>
                                            <FormGroup controlId="formControlsSelect">
                                            <FormControl componentClass="select" placeholder="select">
                                                <option value="select">other</option> 
                                                <option value="select">MacBook Pro 2015</option>
                                                <option value="other">MacBook Pro 2017</option>
                                            </FormControl>
                                        </FormGroup>
                                    </form>
                                </Col>
                            </FormGroup>
                        </Row>

                        <Row className="show-grid">
                            <FormGroup>
                                <Col xs={4}>{"Owner"}</Col>
                                <Col xs = {6}>
                                    <FormGroup controlId="formBasicText" >
                                        <FormControl type="text"
                                                placeholder="Enter name"
                                                onChange={this.handleChange}
                                            />
                                            <FormControl.Feedback />
                                    </FormGroup>
                                </Col>
                                <Col xs = {1}>
                                    <OverlayTrigger trigger="click" placement="top" overlay={
                                        <Popover id="popover-positioned-right" 
                                            title="Popover right">
                                                Persona a cui è affidato il Mac 
                                        </Popover>
                                    }>
                                        <Button><form>info</form></Button>
                                    </OverlayTrigger>
                                    </Col>
                                
                            </FormGroup>
                        </Row>
                        
                        <Row className="show-grid">
                            <FormGroup>
                                <Col xs={4}>{"Rata mensile"}</Col>
                                <Col xs={7}>
                                        <form>
                                        <FormGroup>
                                            <InputGroup>
                                                    <FormControl 
                                                    placeholder="Enter date"
                                                    type="text" 
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
                                <Col xs={4}>{"Note"}</Col>
                                <Col xs={7}>
                                        <form>
                                        <FormGroup controlId="formControlsTextarea">
                                            <FormControl componentClass="textarea" placeholder="insert note here" />
                                        </FormGroup>
                                    </form>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row className="show-grid">
                            <Col xs={7}>
                            </Col>
                            <Col xs={2}>
                                    <Button>Annulla</Button>
                            </Col>
                            <Col xs={1}>
                                    <Button bsStyle="primary">Salva</Button>
                            </Col>
                        </Row>
                    </Grid>
                </form>
            </div>
        );
    }

}