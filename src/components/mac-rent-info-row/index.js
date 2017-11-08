import React, { Component } from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Button } from "antd";

export default withRouter(class MacRentInfoRow extends Component {
    constructor() {
        super();
        this.state = {
            todayDate: moment().format("DD/MM/YYYY")
        }
    };

    static propTypes = {
        id: PropTypes.number,
        realId: PropTypes.number,
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
        delete: PropTypes.func,
        nameChecked: PropTypes.bool,
        userName: PropTypes.string,
        displayName: PropTypes.bool,
        displayCode: PropTypes.bool,
        displayDateFrom: PropTypes.bool,
        displayDateTo: PropTypes.bool,
        displaySerial: PropTypes.bool,
        displayOwner: PropTypes.bool,
        displayFee: PropTypes.bool,
        displayLastMod: PropTypes.bool,
    }

    handleEditButton() {
        this.props.history.push(`/input/${this.props.realId}`);
    }
    handleDeleteButton() {

        var deleteElement = this.props.delete;

        confirmAlert({
            title: "Eliminare?",
            message: "",
            confirmLabel: "OK",
            cancelLabel: "Annulla",
            onConfirm: () => deleteElement(this.props.realId),
        });

    }

    render() {
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
            serial,
            displayName,
            displayCode,
            displayDateFrom,
            displayDateTo,
            displaySerial,
            displayOwner,
            displayFee,
            displayLastMod,
        } = this.props
        var momentFrom = moment(dateFrom, "DD/MM/YYYY");
        var momentTo = moment(dateTo, "DD/MM/YYYY");
        var momentActual = moment(moment(), "DD/MM/YYYY" );

        var diffFrom = momentActual.diff(momentFrom);
        var diffTo = momentActual.diff(momentTo);

        return (
            <tr>
                <td className="card"><span className="rowData">{id}</span></td>
                {displayOwner && <td className="card"><span className="rowData">{owner}</span></td>}
                {displaySerial && <td className="card"><span className="rowData">{serial}</span></td>}
                {displayDateFrom && <td className="card" style={{ backgroundColor: (diffFrom > 0 ? "" : "#99ff99") }}><span className="rowData">{dateFrom}</span></td>}
                {displayDateTo && <td className="card" style={{ backgroundColor: (diffTo > 0 ? "#ff5555" : "") }}><span className="rowData">{dateTo}</span></td>}
                {displayName && <td className="card"><span className="rowData">{name}</span></td>}
                {displayCode && <td className="card"><span className="rowData">{code}</span></td>}
                {displayFee && <td className="card"><span className="rowData">{fee > 0 ? (fee + "€") : "-"}</span></td>}
                {displayLastMod && <td className="card"><span className="rowData">{lastMod}</span></td>}
                <td id="rowDataFix">
                
                    <OverlayTrigger trigger="click" placement="left" overlay={
                    <Popover id="popover-positioned-left">
                            {note} 
                    </Popover>
                }>
                        <span className="rowData"><Button size="small" shape="circle" icon="paper-clip" /> </span>
                    </OverlayTrigger>
                  
                </td>
                <td id="rowDataFix2"><span className="rowData">  <Button size="small" icon="delete" onClick={this.handleDeleteButton.bind(this)}></Button></span></td>
                <td id="rowDataFix3"><span className="rowData">  <Button size="small" type="primary" icon="edit" onClick={this.handleEditButton.bind(this)}></Button></span></td>
            </tr>
        );
    }
}
)
