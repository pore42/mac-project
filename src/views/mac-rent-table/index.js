import React, {Component } from "react";
import {FormGroup, Table, FormControl, InputGroup, Grid, Col, Row, Popover, Image, OverlayTrigger} from "react-bootstrap";
import {Button} from "antd";
import logo from "../../assets/mondora.png";

import MacRentInfoRow from "../../components/mac-rent-info-row";
import getIndex from "../../components/search-array";

export default class MacRentTable extends Component {

    handleSearchButton() {
        alert("clic");
  }

    render () {
        return (
            <form>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={2} xsHidden>
                            <div style={{margin: 15}}>
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
                                            <InputGroup.Addon><Button shape="circle" size = "small" icon="search" onClick={() => this.handleSearchButton()}/></InputGroup.Addon>
                                    </InputGroup>
                                </FormGroup>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <div style={{fontSize: 10}}> 
                                <Table striped bordered responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nome</th>
                                            <th>Codice</th>
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
                                    <MacRentInfoRow value={0} />
                                    <MacRentInfoRow value={1} />
                                </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </form>
        );
    }
}