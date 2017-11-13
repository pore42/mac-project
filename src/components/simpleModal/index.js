import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { PropTypes } from "prop-types";

default export class simpleModal extends Component {
    constructor(props) {
    }

    static propTypes = {
        show: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired,
        title: PropTypes.string
    };

    render() {
        return (<Modal show={this.props.show} onHide={() => this.props.close()}>
            <Modal.Header>
                <Modal.Title>this.props.title</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <Button onClick={() => this.closeDeleteErrorModal()}>Close</Button>
            </Modal.Footer>

        </Modal>)
     }

}
