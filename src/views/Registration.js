import React from "react";
import Config from '../config.json'
import { Button, Table, Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";


class Registration extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            registrations: [],
            activeTab: "Pending"
        }
        this.notificationAlert = React.createRef()
    }

    componentDidMount() {
        return this.getRegistrationList(2)
    }

    getRegistrationList = (status) => {
        let url = `${Config['api-services']}${Config['endpoints']['register']}?status=${status}`
        return fetch(url, {
            headers: {
                'Content-Type': "Application/json",
            },
            method: "GET",
        }).then(response => {
            if (response.status == 200) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        }).then(result => {
            if (result && result.message) {
                this.setState({ registrations: result.message })
            }
            return;
        })
    }

    approveOrRejectVoter = (_id, status) => {
        let url = `${Config['api-services']}${Config['endpoints']['updateRegister']}?status=${status}&id=${_id}`
        return fetch(url, {
            headers: {
                'Content-Type': "Application/json",
            },
            method: "GET",
        }).then(response => {
            if (response.status == 200) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        }).then(() => {
            let message = status == 0 ? "Rejected Successfully" : "Approved Successfully"
            this.notify("tr", message, 2)
            return this.getRegistrationList(2)
        })
    }

    notify = (place, message, color) => {
        var type;
        switch (color) {
            case 1:
                type = "primary";
                break;
            case 2:
                type = "success";
                break;
            case 3:
                type = "danger";
                break;
            case 4:
                type = "warning";
                break;
            case 5:
                type = "info";
                break;
            default:
                break;
        }
        var options = {};
        options = {
            place: place,
            message: message,
            type: type,
            icon: "nc-icon nc-bell-55",
            autoDismiss: 7
        };
        this.notificationAlert.current.notificationAlert(options);
    };

    handleTabClick = (tab) => {
        let status = 0
        if (tab == "Pending") {
            status = 2
        }
        this.setState({ activeTab: tab }, () => {
            this.getRegistrationList(status)
        })
    }

    getDigitalID = (address) => {
        if (!address) {
            return "-";
        }
        let digitalID = address.substring(address.length, 32).toUpperCase()
        return digitalID;
    }

    getActionButtons = (registrationDetails) => {
        return (
            <Row>
                <Col lg="3"></Col>
                <Col lg="2" md="4">
                    <Button
                        className="btn-round"
                        color="primary"
                        onClick={() => this.approveOrRejectVoter(registrationDetails._id, 1)}
                    >
                        Approve
                    </Button>
                </Col>
                <Col lg="1" md="2"></Col>
                <Col lg="2" md="4">
                    <Button
                        className="btn-round"
                        color="primary"
                        onClick={() => this.approveOrRejectVoter(registrationDetails._id, 0)}
                    >
                        Reject
                    </Button>
                </Col>
            </Row >
        )
    }

    getTableHeaders = () => {
        const { activeTab } = this.state;
        return (
            <tr>
                <th style={{ textAlign: "left" }}>Digital ID</th>
                <th style={{ textAlign: "left" }}>Aadhar Number</th>
                <th style={{ textAlign: "left" }}>Name</th>
                <th style={{ textAlign: "left" }}>Sur Name</th>
                <th style={{ textAlign: "left" }}>Location</th>
                <th style={{ textAlign: "left" }}>Address</th>
                <th style={{ textAlign: "left" }}>City</th>
                <th style={{ textAlign: "left" }}>State</th>
                {
                    activeTab == "Pending" ? <th style={{ textAlign: "center" }}>Action</th> : <></>
                }
            </tr>
        )
    }

    getTableData = (registrationDetails) => {
        const { activeTab } = this.state;
        if (!registrationDetails) {
            return <></>;
        }
        return (
            <tr>
                <td style={{ textAlign: "left" }}>{this.getDigitalID(registrationDetails.address)}</td>
                <td style={{ textAlign: "left" }}>{registrationDetails.metaData && registrationDetails.metaData.aadharcardnumber ? registrationDetails.metaData.aadharcardnumber : "-"}</td>
                <td style={{ textAlign: "left" }}>{registrationDetails.name || "-"}</td>
                <td style={{ textAlign: "left" }}>{registrationDetails.soName || "-"}</td>
                <td style={{ textAlign: "left" }}>{registrationDetails.location || "-"}</td>
                <td style={{ textAlign: "left" }}>{registrationDetails.metaData && registrationDetails.metaData.residentialaddress ? registrationDetails.metaData.residentialaddress : "-"}</td>
                <td style={{ textAlign: "left" }}>{registrationDetails.metaData && registrationDetails.metaData.city ? registrationDetails.metaData.city : "-"}</td>
                <td style={{ textAlign: "left" }}>{registrationDetails.metaData && registrationDetails.metaData.state ? registrationDetails.metaData.state : "-"}</td>
                <td style={{ textAlign: "center" }}>{activeTab == "Pending" ? this.getActionButtons(registrationDetails) : ""}</td>
            </tr>
        )
    }

    getRegisterations = () => {
        const { registrations } = this.state;

        return (
            <Table>
                <thead className="text-primary">
                    {
                        this.getTableHeaders()
                    }
                </thead>
                <tbody>
                    {
                        registrations.map((value, key) => {
                            return this.getTableData(value)
                        })
                    }
                </tbody>
            </Table>
        )
    }

    getTabs = () => {
        const { activeTab } = this.state;
        return (
            <div className="tab-header">
                <div className={`tab ${activeTab === 'Pending' ? 'active' : ''}`} onClick={() => this.handleTabClick('Pending')}>
                    Pending
                </div>
                <div className={`tab ${activeTab === 'Rejected' ? 'active' : ''}`} onClick={() => this.handleTabClick('Rejected')}>
                    Rejected
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="content">
                <NotificationAlert ref={this.notificationAlert} />
                {this.getTabs()}
                <div>
                    {this.getRegisterations()}
                </div>
            </div>
        )
    }

}

export default Registration;
