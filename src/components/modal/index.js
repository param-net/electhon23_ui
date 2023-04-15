import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class Popup extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { title, body, isOpen, toggle, isFooterEnabled, modalConfirmed, modalCancelled, size } = this.props;

        return (
            <Modal isOpen={isOpen} toggle={toggle} size={size ? size : "lg"}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>{body}</ModalBody>
                {
                    isFooterEnabled ?
                        <ModalFooter>
                            <Button color="primary" onClick={modalConfirmed}>Confirm</Button>
                            <Button color="secondary" onClick={modalCancelled}>Cancel</Button>
                        </ModalFooter>
                        :
                        <></>
                }
            </Modal>
        )
    }

}

export default Popup;
