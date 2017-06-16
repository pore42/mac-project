import React, {Component, Props} from "react";
import {Button} from "antd";
import {FormGroup, Table, FormControl, InputGroup, Grid, Col, Row, Popover, OverlayTrigger} from "react-bootstrap";

export default class MacRentInfoRow extends Component {

        constructor () {
        super();
        this.state= {
            data: [
                 {
                    name: "pippo",
                    code: "ydhjkbbhjdf",
                    dateFrom: "54-13-2017",
                    dateTo: "22-12-2019",
                    serial: "777",
                    owner: "bob",
                    fee: "617",
                    lastMod: "bob",
                    note: "ho sonno", },
                 {
                    name: "pippo2",
                    code: "ydhjkbbhjdf",
                    dateFrom: "54-13-2017",
                    dateTo: "22-12-2019",
                    serial: "777",
                    owner: "bob",
                    fee: "617",
                    lastMod: "bob",
                    note: "ho sonno", },
            ]
        };
    };

    render () {
        var num = 0;
        return (
            <tr>

                <th>{this.props.value}</th>
                <th>{this.state.data[this.props.value].name}</th>
                <th>{this.state.data[this.props.value].code}</th>
                <th>{this.state.data[this.props.value].dateFrom}</th>
                <th>{this.state.data[this.props.value].dateTo}</th>
                <th>{this.state.data[this.props.value].serial}</th>
                <th>{this.state.data[this.props.value].owner}</th>
                <th>{this.state.data[this.props.value].fee} €</th>
                <th>@ {this.state.data[this.props.value].lastMod}</th>
                <th><OverlayTrigger trigger="click" placement="left" overlay={
                    <Popover id="popover-positioned-left">
                            {this.state.data[this.props.value].note} 
                    </Popover>
                    }>
                    <Button size ="small" shape="circle" icon="paper-clip" />
                </OverlayTrigger>
                </th>
                <th>  <Button size ="small" icon="delete"></Button> </th>
                <th>  <Button size ="small" type="primary" icon="edit" onClick={() => this.props.history.push("/input")}></Button></th>
        
            </tr>
        );
    }
}