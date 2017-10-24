import React, {Component} from "react";
import {FormGroup, Table, FormControl, InputGroup, Grid, Col, Row, Checkbox, Image} from "react-bootstrap";
import changeCase from "change-case";
import moment from "moment";
import{PropTypes} from "prop-types";

import logo from "../../assets/images/mondora.png";




import MacRentInfoRow from "../../components/mac-rent-info-row";

var Button = require("antd/lib/button");
var _ = require("lodash");

export default class MacRentTable extends Component {
    constructor (props) {
        super(props);
        this.state= {
            nameChecked: true,
            codeChecked: true,
            dateFromChecked: true,
            dateToChecked: true,
            serialChecked: true,
            ownerChecked: true,
            feeChecked: true,
            lastModChecked: true,
            filterTerm: "",
            macRentInformations: [],
            userName: "",
        }
  };
    static PropTypes = {
        match: PropTypes.object,
        }

    componentDidMount () {
 
        console.log("get data from google");
        fetch(`https://datastore.googleapis.com/v1/projects/mac-rent-informations:runQuery?access_token=${localStorage.getItem("googleAccessToken")}`, {
            method: "POST",
            body: JSON.stringify({
                query: {
                    kind: [
                        {
                            name: "mac-rent-information"
                        }
                    ]
                }
            })
        }).then(res => res.json()
            ).then(data => {
                var elements = data.batch.entityResults;
                this.setState({ macRentInformations: this.deserializedMacRentInformation(elements) });


            });
    

    }



    deserializedMacRentInformation(rowElements) { 
        

        const elements = rowElements.map((el, i) =>
            ({
                id: i,
                name: el.entity.properties.name.stringValue,
                code: el.entity.properties.code.stringValue,
                dateFrom: moment(el.entity.properties.dateFrom.timestampValue),
                dateTo: moment(el.entity.properties.dateTo.timestampValue),
                serial: el.entity.properties.serial.stringValue,
                owner: el.entity.properties.owner.stringValue,
                fee: el.entity.properties.fee.integerValue,
                lastMod: "io",
                note: el.entity.properties.note.stringValue,
            }));
           


        return  elements ;

    }

    handleOrderDownButtonPress(parameter, macRentInformations){
        _.sortBy(this.state.macRentInformations, [function(o) { return o.name; }]);
        this.setState({macRentInformations: _.sortBy(this.state.macRentInformations, [parameter, "code"])});
    }
    handleOrderUpButtonPress(parameter, macRentInformations){
        _.sortBy(this.state.macRentInformations, [function(o) { return o.name; }]);
        this.setState({macRentInformations: _.sortBy(this.state.macRentInformations, [parameter, "code"]).reverse()});
    }

    filterValues (macRentInformations, filterTerm) {
        var filterTermLowerCase = changeCase.lowerCase(filterTerm);
        return((changeCase.lowerCase(macRentInformations.name).includes(filterTermLowerCase)&&this.state.nameChecked) ||
              (changeCase.lowerCase(macRentInformations.code).includes(filterTermLowerCase)&&this.state.codeChecked) ||
              (changeCase.lowerCase(macRentInformations.dateFrom).includes(filterTermLowerCase)&&this.state.dateFromChecked) ||
              (changeCase.lowerCase(macRentInformations.dateTo).includes(filterTermLowerCase)&&this.state.dateToChecked) ||
              (changeCase.lowerCase(macRentInformations.serial).includes(filterTermLowerCase)&&this.state.serialChecked) ||
              (changeCase.lowerCase(macRentInformations.owner).includes(filterTermLowerCase)&&this.state.ownerChecked) ||
              (changeCase.lowerCase(macRentInformations.lastMod).includes(filterTermLowerCase)&&this.state.lastModChecked) ||
              (String(macRentInformations.fee).includes(filterTerm)&&this.state.feeChecked)
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
                            <InputGroup style={{display: "inline"}}>
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
                        <Table style={{fontSize: 13}} striped bordered responsive>
                            <thead key="thead">
                                <tr>
                                    <th>{" #"}<br/>
                                        <Button style={{margin: 3}} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("id", this.state.macRentInformations)}/>
                                        <Button style={{margin: 3}} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("id", this.state.macRentInformations)}/>
                                    </th>
                                    <th>{"Nome"}<br/>
                                        <Button style={{margin: 3}} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("name", this.state.macRentInformations)}/>
                                        <Button style={{margin: 3}} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("name", this.state.macRentInformations)}/>
                                    </th>
                                    <th>{"Codice"}<br/>
                                        <Button style={{margin: 3}} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("code", this.state.macRentInformations)}/>
                                        <Button style={{margin: 3}} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("code", this.state.macRentInformations)}/>
                                    </th>
                                    <th>{"Data inizio"}<br/>
                                        <Button style={{margin: 3}}  shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("dateFrom", this.state.macRentInformations)}/>
                                        <Button style={{margin: 3}} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("dateFrom", this.state.macRentInformations)}/>
                                    </th>
                                    <th>{"Data termine"}<br/>
                                        <Button style={{margin: 3}} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("dateTo", this.state.macRentInformations)}/>
                                        <Button style={{margin: 3}} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("dateTo", this.state.macRentInformations)}/>
                                    </th>
                                    <th>{"Numero di serie"}<br/>
                                        <Button style={{margin: 3}} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("serial", this.state.macRentInformations)}/>
                                        <Button style={{margin: 3}} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("serial", this.state.macRentInformations)}/>
                                    </th>
                                    <th>{"Owner"}<br/>
                                        <Button style={{margin: 3}} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("owner", this.state.macRentInformations)}/>
                                        <Button style={{margin: 3}} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("owner", this.state.macRentInformations)}/>
                                    </th>
                                    <th>{"Rata mensile"}<br/>
                                        <Button style={{margin: 3}} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("fee", this.state.macRentInformations)}/>
                                        <Button style={{margin: 3}} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("fee", this.state.macRentInformations)}/>
                                    </th>
                                    <th>{"Ultima modifica"}<br/>
                                        <Button style={{margin: 3}} shape="circle" icon="down" size="small" onClick={() => this.handleOrderDownButtonPress("lastMod", this.state.macRentInformations)}/>
                                        <Button style={{margin: 3}} shape="circle" icon="up" size="small" onClick={() => this.handleOrderUpButtonPress("lastMod", this.state.macRentInformations)}/>
                                    </th>
                                    <th>{"Note"}<br/><br/></th>
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
                                            userName={this.state.userName}
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
