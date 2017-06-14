import React, {Component } from "react";
import {FormGroup, FormControl, InputGroup, Navbar, Jumbotron, Grid, Col, Row, Popover, Image, OverlayTrigger, ControlLabel} from "react-bootstrap";
import {Button} from "antd";
import GoogleLogin from 'react-google-login';


function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

const responseGoogle = (response) => {
  console.log(response);
}

export default class UserLogin extends Component {

    render () {
        return (
                <grid>
                    <Row>
                        <Col> 
                            <div style={{textAlign: "center", marginTop: 40, fontSize: 24, fontWeight: "heavy", border: 7}}> Mac rentals summary </div>
                        </Col>
                    </Row>
                    <Row>
                        <div style={{marginTop: 30, textAlign: "center"}}>
                        <Col sm={6} smOffset={3} >
                            <Jumbotron>
                                <form>
                                    <FieldGroup
                                    id="formControlsText"
                                    type="text"
                                    label="Username"
                                    />
                                </form>
                                <form>
                                    <FieldGroup
                                        id="formControlsPassword"
                                        label="Password"
                                        type="password"
                                    />
                                </form>
                                <p><Button bsStyle="primary" >Login</Button></p>
                                <div style ={{ fontSize: 10, fontWeight: "light"  }}>
                                    ---------- or ---------- <br/> <br/>
                                </div>
                                    <GoogleLogin
                                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                        buttonText="Login with Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                    />
                            </Jumbotron>
                        </Col>
                        </div>
                    </Row>
                </grid>
        );
    }
}