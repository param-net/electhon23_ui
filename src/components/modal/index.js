import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

class Popup extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { title, body, isOpen, toggle } = this.props;

        return (
            <Modal isOpen={isOpen} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>{body}</ModalBody>
            </Modal>
        )
    }

}

export default Popup;
