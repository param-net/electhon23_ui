import React from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, FormGroup, Form, Row, Col, Table } from "reactstrap";
import Candidates from '../test/candidate.json';
import Popup from '../components/modal';
import fbLogin from '../assets/icons/nucleo-social-icons/svg/social-1_round-facebook.svg'
import twitterLogin from '../assets/icons/nucleo-social-icons/svg/social-1_round-twitter.svg'
import instaLogin from '../assets/icons/nucleo-social-icons/svg/social-1_round-instagram.svg'
import './user.scss'

class User extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            candidateDetails: [],
            selectedCandidate: {},
            isModalOpen: false,
            selectedCandidateIndex: 0
        }
    }

    componentDidMount() {
        return this.getCandidates()
    }

    getCandidates = () => {
        this.setState({
            candidateDetails: Candidates
        })
        return;
    }

    voteCandidate = (index) => {
        const { candidateDetails } = this.state;
        let candidate = candidateDetails[index] || {}
        console.log("Voted for the Candidate ", candidate.name)
        //TODO: Make API Call to vote the Candidate
        return;
    }

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
                                src={require("assets/img/eci.jpg")}
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

    getCandidateAgendaOrExperience = (type) => {
        const { selectedCandidate } = this.state;
        const experience = selectedCandidate.experience || []
        const agenda = selectedCandidate.agenda || []
        let obj = {}
        if (type == "experience") {
            obj = experience
        } else if (type == "agenda") {
            obj = agenda
        }
        return (
            <Table>
                <thead className="text-primary">
                    {
                        type == "experience" ?
                            <tr>
                                <th>Position</th>
                                <th>Period</th>
                            </tr>
                            : <tr>
                                <th>Issue</th>
                                <th>Position</th>
                            </tr>
                    }
                </thead>
                <tbody>
                    {
                        obj.map((value, key) => {
                            if (type == "experience") {
                                if (!value || !value.position || !value.from || !value.to) {
                                    return <></>;
                                }
                                return (
                                    <tr>
                                        <td>{value.position}</td>
                                        <td>{`${value.from} - ${value.to}`}</td>
                                    </tr>
                                )
                            } else if (type == "agenda") {
                                if (!value || !value.issue || !value.position) {
                                    return <></>;
                                }
                                return (
                                    <tr>
                                        <td>{value.issue}</td>
                                        <td>{value.position}</td>
                                    </tr>
                                )
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
                                {this.getCandidateAgendaOrExperience("experience")}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="12">
                            <FormGroup>
                                <label className="label-key">Agenda</label>
                                {this.getCandidateAgendaOrExperience("agenda")}
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
                {this.getAllCandidates()}
                <Popup
                    toggle={this.toggle}
                    title={this.state.selectedCandidate.name}
                    body={this.getSelectedCandidateProfileDetails()}
                    isOpen={this.state.isModalOpen}
                />
            </>
        )
    }

}

export default User;
