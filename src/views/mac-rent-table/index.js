import React, {Component } from "react";
import {FormGroup, Table, FormControl, InputGroup, Navbar, Jumbotron, Grid, Col, Row, Popover, Image, OverlayTrigger, ControlLabel} from "react-bootstrap";
import {Button} from "antd";
import logo from "../../assets/mondora.png";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

export default class MacRentTable extends Component {

    render () {
        return (
            <form>
                <grid>
                    <Row className="show-grid">
                        <Col sm={2} xsHidden>
                            <div style={{marginTop: 15, marginLeft: 25, marginBottom: 15}}>
                                <Image src={logo} responsive />
                            </div>
                        </Col>
                        <Col sm={5} smOffset={3} >
                            <div style = {{marginBottom: 5, marginTop: 25}}>
                                <FormGroup>
                                    <InputGroup>
                                            <FormControl 
                                            placeholder="search" 
                                            type="text" 
                                            />
                                            <InputGroup.Addon><Button shape="circle" size = "small" icon="search" /></InputGroup.Addon>
                                    </InputGroup>
                                </FormGroup>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={11}>
                            <div style={{fontSize: 10, marginLeft: 15}}>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Codice contratto</th>
                                            <th>Data inizio</th>
                                            <th>Data termine</th>
                                            <th>Numero di serie</th>
                                            <th>Owner</th>
                                            <th>Rata mensile</th>
                                            <th>Ultima modifica</th>
                                            <th>Note</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>7</th>
                                            <th>Mac-Bob</th>
                                            <th>777754858934768</th>
                                            <th>16/10/2015</th>
                                            <th>16/12/2017</th>
                                            <th>milledue</th>
                                            <th>Bob</th>
                                            <th>617 $$</th>
                                            <th>@Bob</th>
                                            <th><OverlayTrigger trigger="click" placement="left" overlay={
                                                <Popover id="popover-positioned-left" 
                                                    title="note">
                                                        per adesso funziona 
                                                </Popover>
                                                }>
                                                <Button size ="small" shape="circle" icon="info" />
                                            </OverlayTrigger>
                                            </th>
                                            <th>  <Button size ="small" icon="delete"></Button> </th>
                                            <th>  <Button size ="small" type="primary" icon="edit" onClick={() => this.props.history.push("/input")}></Button></th>
                                        </tr>
                                        <tr>
                                            <th>5</th>
                                            <th>Mac-Bob76</th>
                                            <th>7fwhfhjfvVJKHDF</th>
                                            <th>16/10/2033</th>
                                            <th>16/12/2018</th>
                                            <th>fdffvghj</th>
                                            <th>Bob</th>
                                            <th>617 $$</th>
                                            <th> @bob </th>
                                            <th><OverlayTrigger trigger="click" placement="left" overlay={
                                                <Popover id="popover-positioned-left" 
                                                    title="note">
                                                        distrutto due volte
                                                </Popover>
                                                }>
                                                <Button size ="small" shape="circle" icon="info" />
                                            </OverlayTrigger>
                                            </th>
                                            <th>  <Button size ="small" icon="delete"></Button> </th>
                                            <th>  <Button size ="small" type="primary" icon="edit" onClick={() => this.props.history.push("/input")}></Button></th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </grid>
            </form>
        );
    }
}