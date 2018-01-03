import React, { Component } from "react";
import { Jumbotron, Col, Row, Image } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import logo from "../../assets/images/mondora.png";
import logoGoogle from "../../assets/images/google.png";


export default class UserLogin extends Component {


    onSignIn(googleUser) {

        const { name, email } = googleUser.profileObj;
        if (email.includes("@mondora.com")) {
            localStorage.setItem("googleAccessToken", googleUser.accessToken);
            localStorage.setItem("userName", name)
            this.props.history.push(`/results/`, "statonuovo");
        } else {
            alert("email non autorizzata");
        }
    }




    render() {
        const responseGoogle = (response) => {
            this.onSignIn(response);
        }

        return (
            <grid style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Row className="show-grid" style={{ marginTop: 15, marginBottom: 15 }}>
                    <Image src={logo} responsive />
                </Row>
                <Row style={{ fontSize: 30, fontWeight: "heavy", border: 7, marginBottom: 10, fontFamily: "oldMacFont" }}>
                    {"Riassunto Affitti MacBook"}
                </Row>
                <Row>
                    <Jumbotron style={{ padding: 50 }}>
                        <grid>
                            <Row>
                                <Col xs={3} style={{ width: 45, height: 45, padding: 0, marginRight: -2 }}>
                                    <Image src={logoGoogle} responsive />
                                </Col>
                                <Col xs={9} style={{ padding: 0 }}>
                                    <GoogleLogin
                                        clientId="524088644940-rlsefunif94pvmlhla81d71vcogtvdiq.apps.googleusercontent.com"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        response_type='token'
                                        scope="https://www.googleapis.com/auth/datastore"
                                        buttonText="Login with Google"
                                        autoLoad={false}
                                    />
                                </Col>
                            </Row>
                        </grid>
                    </Jumbotron>
                </Row>
            </grid>
        );
    }

}
