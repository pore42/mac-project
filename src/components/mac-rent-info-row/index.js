import React, {Component, PropTypes} from "react";
import {Button} from "antd";
import {Popover, OverlayTrigger} from "react-bootstrap";
import {withRouter} from "react-router-dom";

 export default withRouter( class MacRentInfoRow extends Component {

    static propTypes = {
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

    handleEditButton(value){
        this.props.history.push('/input');
    }

    render () {
        const {
            name,
            code,
            dateFrom,
            dateTo,
            fee,
            history,
            lastMod,
            location,
            match,
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
                <th>  <Button size ="small" icon="delete"></Button> </th>
                <th>  <Button size ="small" type="primary" icon="edit" onClick={() => this.handleEditButton()}></Button></th>
        
            </tr>
        );
    }
}
 )
