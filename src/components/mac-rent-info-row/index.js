import React, {Component} from "react";
import {Popover, OverlayTrigger} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";

var Button = require('antd/lib/button');

 export default withRouter( class MacRentInfoRow extends Component {

    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string,
        code: PropTypes.string,
        dateFrom: PropTypes.string,
        dateTo: PropTypes.string,
        fee: PropTypes.string,
        history: PropTypes.object.isRequired,
        lastMod: PropTypes.string,
        note: PropTypes.string,
        owner: PropTypes.string,
        serial: PropTypes.string
    }

    handleEditButton(){
        this.props.history.push(`/input/${this.props.id}`);
    }
    handleDeleteButton(){
        var url = "http://localhost:3456/mac-rent-informations/" + this.props.id;
        fetch(url, {
            method: "DELETE"
        }).then(response => response.json().then(json => {return json;})); }

    render () {
        const {
            name,
            code,
            dateFrom,
            dateTo,
            fee,
            lastMod,
            note,
            owner,
            serial
        } = this.props
        return (
            <tr>
                <th>{name}</th>
                <th>{code}</th>
                <th>{dateFrom}</th>
                <th>{dateTo}</th>
                <th>{serial}</th>
                <th>{owner}</th>
                <th>{fee} €</th>
                <th>@ {lastMod}</th>
                <th><OverlayTrigger trigger="click" placement="left" overlay={
                        <Popover id="popover-positioned-left">
                            {note} 
                        </Popover>
                    }>
                    <Button size ="small" shape="circle" icon="paper-clip" />
                </OverlayTrigger>
                </th>
                <th>  <Button size ="small" icon="delete" onClick={this.handleDeleteButton.bind(this)}></Button> </th>
                <th>  <Button size ="small" type="primary" icon="edit" onClick={this.handleEditButton.bind(this)}></Button></th>
            </tr>
        );
    }
}
 )
