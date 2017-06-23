import React, {Component } from "react";
import {FormGroup, Table, FormControl, InputGroup, Grid, Col, Row, Checkbox, Image} from "react-bootstrap";
import changeCase from "change-case";
import moment from 'moment';

import logo from "../../assets/images/mondora.png";

import MacRentInfoRow from "../../components/mac-rent-info-row";

var Button = require('antd/lib/button');
var _ = require('lodash');

export default class MacRentTable extends Component {
    constructor () {
        super();
        this.state= {
            nameChecked: true,
            codeChecked: true,
            dateFromChecked: true,
            dateToChecked: true,
            serialChecked: true,
            ownerChecked: true,
            feeChecked: true,
            lastModChecked: true,
            filterTerm: '',
            macRentInformations: []
        }
    };

    componentDidMount () {
        fetch("http://localhost:3456/mac-rent-informations")
        .then(response => response.json())
        .then(response => this.setState({ macRentInformations: response }));


        fetch("https://datastore.googleapis.com/v1/projects/mac-rent-informations:runQuery",
            {
                method: "POST",
                
                body: {
                    query: {
                        kind: [
                            {name: 'mac-rent-information'}
                        ]
                    }
                }
            }
        ).then(res => console.log('res', res));
    }

    handleOrderButtonPress(parameter, macRentInformations){
        _.sortBy(this.state.macRentInformations, [function(o) { return o.name; }]);
        this.setState({macRentInformations: _.sortBy(this.state.macRentInformations, [parameter, 'code'])});
    }

    filterValues (macRentInformations, filterTerm) {
        var filterTermLowerCase = changeCase.lowerCase(filterTerm);
        return ((changeCase.lowerCase(macRentInformations.name).includes(filterTermLowerCase)&&this.state.nameChecked) ||
            (changeCase.lowerCase(macRentInformations.code).includes(filterTermLowerCase)&&this.state.codeChecked) ||
            (changeCase.lowerCase(macRentInformations.dateFrom).includes(filterTermLowerCase)&&this.state.dateFromChecked) ||
            (changeCase.lowerCase(macRentInformations.dateTo).includes(filterTermLowerCase)&&this.state.dateToChecked) ||
            (changeCase.lowerCase(macRentInformations.serial).includes(filterTermLowerCase)&&this.state.serialChecked) ||
            (changeCase.lowerCase(macRentInformations.owner).includes(filterTermLowerCase)&&this.state.ownerChecked) ||
            (String(macRentInformations.fee).includes(filterTerm)&&this.state.feeChecked) ||
            (changeCase.lowerCase(macRentInformations.lastMod).includes(filterTermLowerCase)&&this.state.lastModChecked)
        );
    }

    render () {
        return (
            <Grid fluid={true} style={{padding: 20, margin:0}}>
                <Row className="show-grid">
                    <Col sm={2} xsHidden style={{margin: 15}}>
                        <Image src={logo} responsive />
                    </Col>
                    <div style = {{marginBottom: 5, marginTop: 25, padding: 0}}>
                        <Col sm={4} xs={6} style={{marginRight: 5}}>
                            <InputGroup>
                                <FormControl 
                                    onChange={e => this.setState({filterTerm: e.target.value})}
                                    placeholder="search" 
                                    value={this.state.filterTerm}
                                    type="text" 
                                />
                            </InputGroup>
                        </Col>
                        <Col sm={5} xs={5} style={{fontSize: 10}}>
                            <FormGroup>
                                <Checkbox style={{marginLeft: 10}} onClick={() => this.setState({nameChecked: !this.state.nameChecked})} defaultChecked inline>
                                    {"Nome"}
                                </Checkbox>
                                <Checkbox onClick={() => this.setState({codeChecked: !this.state.codeChecked})} defaultChecked inline>
                                    {"Codice"}
                                </Checkbox>
                                <Checkbox onClick={() => this.setState({dateFromChecked: !this.state.dateFromChecked})} defaultChecked inline>
                                    {"Inizio"}
                                </Checkbox>
                                <Checkbox onClick={() => this.setState({dateToChecked: !this.state.dateToChecked})} defaultChecked inline>
                                    {"Termine"}
                                </Checkbox>
                                <Checkbox onClick={() => this.setState({serialChecked: !this.state.serialChecked})} defaultChecked inline>
                                    {"N° serie"}
                                </Checkbox>
                                <Checkbox onClick={() => this.setState({ownerChecked: !this.state.ownerChecked})} defaultChecked inline>
                                    {"Owner"}
                                </Checkbox>
                                <Checkbox onClick={() => this.setState({feeChecked: !this.state.feeChecked})} defaultChecked inline>
                                    {"Rata"}
                                </Checkbox>
                                <Checkbox onClick={() => this.setState({lastModChecked: !this.state.lastModChecked})} defaultChecked inline>
                                    {"Ultima modifica"}
                                </Checkbox>
                            </FormGroup>
                        </Col>
                    </div>
                </Row>
                <Row>
                    <Col sm={12} xs={12} style={{margin: 5}}>
                        <Table style={{fontSize: 10}} striped bordered responsive>
                            <thead key="thead">
                                <tr>
                                    <th>#<br/><Button shape="circle" icon="down" size="small" onClick={() => this.handleOrderButtonPress("id", this.state.macRentInformations)}/></th>
                                    <th>Nome<br/><Button shape="circle" icon="down" size="small" onClick={() => this.handleOrderButtonPress("name", this.state.macRentInformations)}/></th>
                                    <th>Codice<br/><Button shape="circle" icon="down" size="small" onClick={() => this.handleOrderButtonPress("code", this.state.macRentInformations)}/></th>
                                    <th>Data inizio<br/><Button shape="circle" icon="down" size="small" onClick={() => this.handleOrderButtonPress("dateFrom", this.state.macRentInformations)}/></th>
                                    <th>Data termine<br/><Button shape="circle" icon="down" size="small" onClick={() => this.handleOrderButtonPress("dateTo", this.state.macRentInformations)}/></th>
                                    <th>Numero di serie<br/><Button shape="circle" icon="down" size="small" onClick={() => this.handleOrderButtonPress("serial", this.state.macRentInformations)}/></th>
                                    <th>Owner<br/><Button shape="circle" icon="down" size="small" onClick={() => this.handleOrderButtonPress("owner", this.state.macRentInformations)}/></th>
                                    <th>Rata mensile<br/><Button shape="circle" icon="down" size="small" onClick={() => this.handleOrderButtonPress("fee", this.state.macRentInformations)}/></th>
                                    <th>Ultima modifica<br/><Button shape="circle" icon="down" size="small" onClick={() => this.handleOrderButtonPress("lastMod", this.state.macRentInformations)}/></th>
                                    <th>Note</th>
                                </tr>
                            </thead>
                            <tbody key="tbody">
                                {this.state.macRentInformations
                                    .filter(element => this.filterValues(element, this.state.filterTerm))
                                    .map(macRentInfo => 
                                        <MacRentInfoRow key={macRentInfo.id}
                                            id={macRentInfo.id}
                                            name={macRentInfo.name}
                                            code={macRentInfo.code}
                                            dateFrom={moment(macRentInfo.dateFrom).format("DD/MM/YYYY")}
                                            dateTo={moment(macRentInfo.dateTo).format("DD/MM/YYYY")}
                                            fee = {String(macRentInfo.fee)}
                                            lastMod={macRentInfo.lastMod}
                                            note={macRentInfo.note}
                                            owner={macRentInfo.owner}
                                            serial={macRentInfo.serial}
                                        />,
                                    )
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Grid>
        );
    }
}