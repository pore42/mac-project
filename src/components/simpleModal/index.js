import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { PropTypes } from "prop-types";

export default class SimpleModal extends Component {

    static propTypes = {
        show: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired,
        title: PropTypes.string
    };

    render() {
        return (<Modal show={this.props.show} onHide={() => this.props.close()}>
            <Modal.Header>
                <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <Button onClick={() => this.props.close()}>Close</Button>
            </Modal.Footer>

        </Modal>)
    }

}
