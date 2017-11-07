import React , {Component} from "react";
import {Jumbotron, Col, Row, Image} from "react-bootstrap";
import GoogleLogin from "react-google-login";
import logo from "../../assets/images/mondora.png";
import logoGoogle from "../../assets/images/google.png";

export default class UserLogin extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
        accessToken: "",
    };
}

 oauthSignIn = () => {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {client_id: '524088644940-rlsefunif94pvmlhla81d71vcogtvdiq.apps.googleusercontent.com',
        redirect_uri: window.location.href,
        response_type: 'token',
        scope: 'https://www.googleapis.com/auth/datastore',
        include_granted_scopes: 'true',
        state: 'pass-through value'};

    // Add form parameters as hidden input values.
    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}

    responseGoogle = (response) => {
        console.log(response)
        if(response.profileObj.email.includes("@mondora.com")){
            console.log("save token");
            localStorage.setItem("googleAccessToken", response.accessToken);
            localStorage.setItem("userName", response.profileObj.name)
            console.log("risposto bene: ", this.props.history);
            this.props.history.push(`/results/`, "statonuovo");
        }else{
            alert("email non autorizzata");
        }        
    }

    render () {
        return ( 
            <grid style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Row className="show-grid" style={{marginTop: 15, marginBottom: 15}}>
                    <Image src={logo} responsive />
                </Row>
                <Row style={{ fontSize: 30, fontWeight: "heavy", border: 7, marginBottom: 10}}>
                    {"Mac rentals summary"}
                </Row>
                <Row>
                    <Jumbotron style={{padding: 50}}>
                        <grid>
                            <Row>
                                <Col xs={3} style={{ width: 45, height: 45, padding: 0, marginRight: -2}}>
                                    <Image src={logoGoogle} responsive />
                                </Col>
                                <Col xs={9} style={{padding: 0}}>
                                    <GoogleLogin
                                        clientId="524088644940-rlsefunif94pvmlhla81d71vcogtvdiq.apps.googleusercontent.com"
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.oauthSignIn}
                                        response_type= 'token'
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
};
