import React from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, FormGroup, Form, Row, Col, Table } from "reactstrap";
import Popup from '../components/modal';
import fbLogin from '../assets/icons/nucleo-social-icons/svg/social-1_round-facebook.svg'
import twitterLogin from '../assets/icons/nucleo-social-icons/svg/social-1_round-twitter.svg'
import instaLogin from '../assets/icons/nucleo-social-icons/svg/social-1_round-instagram.svg'
import './user.scss';
import Config from '../config.json'
import NotificationAlert from "react-notification-alert";


class User extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            candidateDetails: [],
            selectedCandidate: {},
            isModalOpen: false,
            selectedCandidateIndex: 0,
            isVoteModalOpen: false
        }
        this.notificationAlert = React.createRef();
    }

    componentDidMount() {
        return this.getCandidates().then(result => {
            if (!result && !result.message) {
                this.notify('tr', "Unable to get the candidates", 3)
                return Promise.reject("Unable to get the candidates")
            }
            this.setState({
                candidateDetails: result.message
            })
            return;
        })
    }

    getCandidates = () => {
        let url = `${Config['api-services']}${Config['endpoints']['getAllCandidates']}`
        let body = {
            location: "Nipani"
        }
        return fetch(url, {
            headers: {
                'Content-Type': "Application/json",
            },
            method: "POST",
            body: JSON.stringify(body)
        }).then(response => {
            if (response.status == 200) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        })
    }

    voteCandidate = (index) => {
        const { candidateDetails } = this.state;
        let candidate = candidateDetails[index] || {}
        console.log("Voted for the Candidate ", candidate.name)

        let url = `${Config['api-services']}${Config['endpoints']['vote']}`
        let body = {
            "address": "0x181ac1208d859510116c56c3d3cbf4cf58437681",
            "cID": 3
        }
        return fetch(url, {
            headers: {
                'Content-Type': "Application/json",
            },
            method: "POST",
            body: JSON.stringify(body)
        }).then(response => {
            if (response.status == 200) {
                return response.json()
            }
            return Promise.reject(response.statusText)
        }).then(result => {
            if (result && result.message) {
                return this.notify('tr', "Vote Casted Successfully", 2)
            }
        }).catch(err => {
            return this.notify('tr', "Something Went Wrong", 3)
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

    showCandidateDetails = (index) => {
        const { candidateDetails } = this.state;
        let candidate = candidateDetails[index] || {}
        this.setState({
            selectedCandidate: candidate,
            isModalOpen: true,
            selectedCandidateIndex: index
        })
    }

    toggle = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    voteModal = () => {
        this.setState({
            isVoteModalOpen: !this.state.isVoteModalOpen
        })
    }

    modalConfirmed = () => {
        this.setState({
            isVoteModalOpen: !this.state.isVoteModalOpen
        })
        return this.voteCandidate(this.state.selectedCandidateIndex)
    }

    modalCancelled = () => {
        this.setState({
            isVoteModalOpen: !this.state.isVoteModalOpen
        })
    }

    getConfirmation = () => {
        const { selectedCandidate } = this.state;

        return (
            <div>
                {`Are sure you want to vote for ${selectedCandidate.name}`}
            </div>
        )
    }

    getSelectedCandidate = (index) => {
        const { candidateDetails } = this.state;
        let candidate = candidateDetails[index] || {}
        if (!candidate || !Object.keys(candidate).length) {
            return <></>;
        }
        return (
            <Card className="card-user">
                <div className="image">
                    <img alt="..." src={require("assets/img/damir-bosnjak.jpg")} />
                </div>
                <CardBody>
                    <div className="author">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                                alt="..."
                                className="avatar border-gray"
                                src={candidate.profile}
                            />
                            <div onClick={() => this.showCandidateDetails(index)}>
                                <h5 className="title">
                                    {candidate.name}
                                </h5>
                            </div>
                        </a>
                        <p className="description" style={{ color: "black", fontWeight: "bold" }}>{candidate.party}</p>
                    </div>
                </CardBody>
                <CardFooter>
                    <div className="button-container">
                        <Row>
                            <Col lg="2" md="2"></Col>
                            <Col className="ml-auto mr-auto" lg="4" md="4">
                                <Button
                                    className="btn-round"
                                    color="primary"
                                    onClick={() => this.showCandidateDetails(index)}
                                >
                                    View
                                </Button>
                            </Col>
                            <Col className="ml-auto mr-auto" lg="4" md="4">
                                <Button
                                    className="btn-round"
                                    color="primary"
                                    onClick={() => this.voteCandidate(index)}
                                >
                                    Vote
                                </Button>
                            </Col>
                            <Col lg="2" md="2"></Col>
                        </Row>
                    </div>
                </CardFooter>
            </Card>
        )
    }

    getTableHeaders = (type) => {
        switch (type) {
            case "experience":
                return (
                    <tr>
                        <th>Position</th>
                        <th>Period</th>
                    </tr>
                )
            case "agenda":
                return (
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                )
            case "assets":
                return (
                    <tr>
                        <th>Property Type</th>
                        <th>Property Value</th>
                        <th>Street Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                    </tr>
                )
        }
    }

    getTableData = (type, value) => {
        switch (type) {
            case "experience":
                return (
                    <tr>
                        <td>{value.position}</td>
                        <td>{`${value.from} - ${value.to}`}</td>
                    </tr>
                )
            case "agenda":
                return (
                    <tr>
                        <td>{value.issue}</td>
                        <td><div dangerouslySetInnerHTML={{ __html: `<p>${value.position}</p>` }}></div></td>
                    </tr>
                )
            case "assets":
                return (
                    <tr>
                        <td>{value.type}</td>
                        <td>{value.value}</td>
                        <td>{value.address.street}</td>
                        <td>{value.address.city}</td>
                        <td>{value.address.state}</td>
                        <td>{value.address.zip}</td>
                    </tr>
                )
        }
    }

    viewCandidateDetails = (type) => {
        const { selectedCandidate } = this.state;
        const experience = selectedCandidate.experience || []
        const agenda = selectedCandidate.agenda || []
        const assets = selectedCandidate.assets && selectedCandidate.assets.real_estate ? selectedCandidate.assets.real_estate : []
        let obj = {}
        if (type == "experience") {
            obj = experience
        } else if (type == "agenda") {
            obj = agenda
        } else if (type == "assets") {
            obj = assets
        }
        if (!Object.keys(obj).length) {
            if (type == "experience") {
                return <div>{"New Candidate"}</div>
            }
            return <div>{"-"}</div>
        }
        return (
            <Table>
                <thead className="text-primary">
                    {
                        this.getTableHeaders(type)
                    }
                </thead>
                <tbody>
                    {
                        obj.map((value, key) => {
                            if (type == "experience") {
                                if (!value || !value.position || !value.from || !value.to) {
                                    return <></>;
                                }
                                return this.getTableData(type, value)
                            } else if (type == "agenda") {
                                if (!value || !value.issue || !value.position) {
                                    return <></>;
                                }
                                return this.getTableData(type, value)
                            } else if (type == "assets") {
                                if (!value) {
                                    return <></>;
                                }
                                return this.getTableData(type, value)
                            }
                        })
                    }
                </tbody>
            </Table>
        )
    }

    getSelectedCandidateProfileDetails = () => {
        const { selectedCandidate, selectedCandidateIndex } = this.state;
        return (
            <CardBody>
                <Form>
                    <Row>
                        <Col className="pr-1" md="4">
                            <FormGroup>
                                <label className="label-key">Party</label>
                                <p>{selectedCandidate.party}</p>
                            </FormGroup>
                        </Col>
                        <Col className="px-1" md="4">
                            <FormGroup>
                                <label className="label-key">Name</label>
                                <p>{selectedCandidate.name}</p>
                            </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                            <FormGroup>
                                <label className="label-key">Age</label>
                                <p>{selectedCandidate.age}</p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="12">
                            <FormGroup>
                                <label className="label-key">Experience</label>
                                {this.viewCandidateDetails("experience")}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="12">
                            <FormGroup>
                                <label className="label-key">Manifesto</label>
                                {this.viewCandidateDetails("agenda")}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="4">
                            <FormGroup>
                                <label className="label-key">Cash</label>
                                <p>{selectedCandidate.assets && selectedCandidate.assets.cash ? selectedCandidate.assets.cash : ""}</p>
                            </FormGroup>
                        </Col>
                        <Col className="px-1" md="4">
                            <FormGroup>
                                <label className="label-key">Investments</label>
                                <p>{selectedCandidate.assets && selectedCandidate.assets.investments ? selectedCandidate.assets.investments : ""}</p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="12">
                            <FormGroup>
                                <label className="label-key">Assets</label>
                                {this.viewCandidateDetails("assets")}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <div className="update ml-auto mr-auto">
                            <Button
                                className="btn-round"
                                color="primary"
                                onClick={() => this.voteCandidate(selectedCandidateIndex)}
                            >
                                Vote
                            </Button>
                        </div>
                    </Row>
                </Form>
            </CardBody>
        )
    }

    getAllCandidates = () => {
        const { candidateDetails } = this.state;
        let rowCount = 0
        if (candidateDetails && Array.isArray(candidateDetails) && candidateDetails.length) {
            rowCount = candidateDetails / 3
            if (candidateDetails % 3 !== 0) {
                rowCount += 1
            }
        }
        return (
            <div className="content">
                <Row sm={rowCount} md={rowCount} lg={rowCount} xs={rowCount}>
                    {
                        candidateDetails.map((value, key) => {
                            if (!value) {
                                return <></>;
                            }
                            return (
                                <Col md={4} lg={4}>
                                    {this.getSelectedCandidate(key)}
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        )
    }

    render() {
        return (
            <>
                <NotificationAlert ref={this.notificationAlert} />
                {this.getAllCandidates()}
                <Popup
                    toggle={this.toggle}
                    title={this.state.selectedCandidate.name}
                    body={this.getSelectedCandidateProfileDetails()}
                    isOpen={this.state.isModalOpen}
                />
                <Popup
                    toggle={this.voteModal}
                    title={this.state.selectedCandidate.name}
                    body={this.getConfirmation()}
                    isOpen={this.state.isVoteModalOpen}
                    isFooterEnabled={true}
                    modalConfirmed={this.modalConfirmed}
                    modalCancelled={this.modalCancelled}
                />
            </>
        )
    }

}

export default User;
