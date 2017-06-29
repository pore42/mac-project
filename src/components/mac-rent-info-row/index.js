import React, {Component} from "react";
import {Popover, OverlayTrigger} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Button } from "antd";

 export default withRouter( class MacRentInfoRow extends Component {
   constructor () {
        super();
        this.state= {
            todayDate: moment().format("DD/MM/YYYY")
        }
    };

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
        serial: PropTypes.string,
    }

    handleEditButton(){
        this.props.history.push(`/input/${this.props.id}`);
    }
    handleDeleteButton(){
        confirmAlert({
            title: "Eliminare?",
            message: "",
            confirmLabel: "OK",
            cancelLabel: "Annulla",
            onConfirm: () => fetch(`http://localhost:3456/mac-rent-informations/${this.props.id}`, {
                method: "DELETE"
            }).then(response => response.json().then(json => {return json;})),
        })
    }

    render () {
        const {
            id,
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
        var b = moment(dateFrom, "dd/mm/yyyy");
        var c = moment(dateTo, "dd/mm/yyyy")
        var a = moment(moment().format("DD/MM/YYYY"), "dd/mm/yyyy");

        return (
            <tr>
                <th>{id}</th>
                <th>{name}</th>
                <th>{code}</th>
                <th style={{backgroundColor:(moment(b).isBefore(a)? "": "#99ff99")}}>{dateFrom}</th>
                <th style={{backgroundColor:(moment(c).isBefore(a)? "#ff5555": "")}}>{dateTo}</th>
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
