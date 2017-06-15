import React, {Component } from "react";
import {FormGroup, FormControl, InputGroup, Navbar, Jumbotron, Grid, Col, Row, Popover, Image, OverlayTrigger, ControlLabel} from "react-bootstrap";
import {Button} from "antd";
import GoogleLogin from 'react-google-login';
import logo from "../../assets/mondora.png";
import logoGoogle from "../../assets/google.png";


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
                <grid style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Row className="show-grid" style={{marginTop: 15, marginBottom: 15}}>
                        <Image src={logo} responsive />
                    </Row>
                    <Row style={{ fontSize: 24, fontWeight: "heavy", border: 7}}>
                        {"Mac rentals summary"}
                    </Row>
                    <Row>
                        <Jumbotron style={{padding: 50}}>
                            <grid>
                                <Row>
                                    <Col xs={3} style={{width: 45, height: 45, padding: 0, margin: 0}}>
                                        <Image src={logoGoogle} responsive />
                                    </Col>
                                    <Col xs={9} style={{padding: 0, margin: 0}}>
                                        <GoogleLogin
                                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                            buttonText="Login with Google"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button onClick={ () => this.props.history.push("/input")}> Login senza password </Button>
                                    </Col>
                                </Row>
                            </grid>
                        </Jumbotron>
                    </Row>
                </grid>
        );
    }
}