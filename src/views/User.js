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
            isVoteModalOpen: false,
            disableVote: false,
            profile: {}
        }
        this.notificationAlert = React.createRef();
    }

    componentDidMount() {
        let profile = JSON.parse(localStorage.getItem("profile"));
        this.setState({ profile: profile })
        let disableVote = profile && profile.isVoted ? profile.isVoted : false;
        return this.getCandidates().then(result => {
            if (!result && !result.message) {
                this.notify('tr', "Unable to get the candidates", 3)
                return Promise.reject("Unable to get the candidates")
            }
            this.setState({
                candidateDetails: result.message,
                disableVote
            })
            return;
        })
    }

    getCandidates = () => {
        let url = `${Config['api-services']}${Config['endpoints']['getAllCandidates']}`
        let profile = JSON.parse(localStorage.getItem("profile"))
        let body = {
            location: ""
        }
        if (profile && profile.location) {
            body.location = profile.location
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

    voteCandidate = (cID) => {
        let profile = JSON.parse(localStorage.getItem("profile"))
        let address = profile && profile.address ? profile.address : ""
        let isAdminLogin = profile && profile.isAdmin ? true : false

        let url = `${Config['api-services']}${Config['endpoints']['vote']}`
        /**
         * cID
         * offline - NA
         * online - 2
         */
        let body = {
            "address": address,
            "cID": cID
        }
        // if (!isAdminLogin) {
        //     body.cID = 2
        // }
        if (isAdminLogin) {
            body.cID = 0
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
                this.setState({ disableVote: true })
                let profile = JSON.parse(localStorage.getItem("profile"))
                profile['isVoted'] = true
                profile['cID'] = cID;
                localStorage.setItem("profile", JSON.stringify(profile))
                this.setState({ profile })
                if (result.message == "Already Voted") {
                    this.notify('tr', result.message, 3)
                    this.history.push({
                        pathname: "/login"
                    })
                    return;
                }
                return this.notify('tr', "Voted Successfully", 2)
            }
            return Promise.reject("Unable to Vote")
        }).catch(err => {
            console.error(err)
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

    voteModal = (index) => {
        const { candidateDetails, selectedCandidate } = this.state;
        this.setState({
            isVoteModalOpen: !this.state.isVoteModalOpen,
            selectedCandidate: candidateDetails[index] || selectedCandidate
        })
    }

    modalConfirmed = () => {
        this.setState({
            isVoteModalOpen: !this.state.isVoteModalOpen
        })
        const { selectedCandidate } = this.state
        return this.voteCandidate(selectedCandidate._id)
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
                            <Col className="ml-auto mr-auto" xs="6" sm="6" md="6" lg="6" xl="6">
                                <text
                                    className="viewprofile"
                                    onClick={() => this.showCandidateDetails(index)}
                                    role="button"
                                >
                                    View Profile
                                </text>
                            </Col>
                            <Col className="ml-auto mr-auto" xs="6" sm="6" md="6" lg="6" xl="6">
                                {
                                    this.state.disableVote && candidate._id === this.state.profile.cID ?
                                        "Voted"
                                        :
                                        this.state.disableVote && this.state.profile.cID === 0 ?
                                            "Voted Offline"
                                            :
                                            this.state.disableVote ?
                                                ""
                                                :
                                                <Button
                                                    className="btn-round"
                                                    color="primary"
                                                    // onClick={() => this.voteCandidate(candidate && candidate._id)}
                                                    onClick={() => this.voteModal(index)}
                                                //disabled={this.state.disableVote}
                                                >
                                                    Vote
                                                </Button>
                                }
                            </Col>
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
                                onClick={() => this.voteModal(selectedCandidateIndex)}
                                disabled={this.state.disableVote}
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
                    size={"md"}
                />
            </>
        )
    }

}

export default User;
