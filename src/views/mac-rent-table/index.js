import React, {Component } from "react";
import {FormGroup, Table, FormControl, InputGroup, Navbar, Jumbotron, Grid, Col, Row, Popover, Image, OverlayTrigger, ControlLabel} from "react-bootstrap";
import {Button} from "antd";

export default class MacRentTable extends Component {

    render () {
        return (
            <form>
                <grid>
                    <Row>
                        <Col sm={12}>
                            <Image src={require("/Users/macbookadmin/Desktop/progetto-computer/mac-summary-project/src/assets/mondora.png")} responsive />
                            </Col>
                    </Row>
                    <Row className="show-grid">
                        <div style = {{marginBottom: 5}}>
                            <Col sm={5} smOffset={6} >
                                <FormGroup>
                                    <InputGroup>
                                            <FormControl 
                                            placeholder="search" 
                                            type="text" 
                                            />
                                            <InputGroup.Addon><Button shape="circle" size = "small" icon="search" /></InputGroup.Addon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </div>
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
                                            <th>Modello</th>
                                            <th>Owner</th>
                                            <th>Rata mensile</th>
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
                                            <th>MacBook Pro 2015</th>
                                            <th>Bob</th>
                                            <th>617 $$</th>
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
                                            <th>  <Button size ="small" type="primary" icon="edit"></Button></th>
                                        </tr>
                                        <tr>
                                            <th>5</th>
                                            <th>Mac-Bob76</th>
                                            <th>7fwhfhjfvVJKHDF</th>
                                            <th>16/10/2033</th>
                                            <th>16/12/2018</th>
                                            <th>MacBook Pro 2015</th>
                                            <th>Bob</th>
                                            <th>617 $$</th>
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
                                            <th>  <Button size ="small" type="primary" icon="edit"></Button></th>
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