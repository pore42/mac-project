import React , {Component} from "react";
import {Jumbotron, Col, Row, Image} from "react-bootstrap";
import GoogleLogin from 'react-google-login';
import logo from "../../assets/mondora.png";
import logoGoogle from "../../assets/google.png";

export default class UserLogin extends Component {
    constructor(props) {
    super(props);
    this.state = {
        userName: "",
        authorizedStatus: false,
        address1: "scarinzis@gmail.com",
        address2: "mailacaso@gmail.com",
    };
    }

responseGoogle = (response) => {
    if (response.profileObj.email === this.state.address1 || response.profileObj.email === this.state.address2){
        this.setState({userName: response.profileObj.givenName});
        this.setState({authorizedStatus: true});
        console.log(this.state.userName);
      this.props.history.push("/input")
    }
    else{
      alert('email non autorizzata');
}
}

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
                                            onSuccess={this.responseGoogle}
                                        />
                                    </Col>
                                </Row>
                            </grid>
                        </Jumbotron>
                    </Row>
                </grid>
        );
    }
};