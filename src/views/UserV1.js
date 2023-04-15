import React from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, FormGroup, Form, Input, Row, Col, Table } from "reactstrap";
import Candidates from '../test/candidate.json';
import fbLogin from '../assets/icons/nucleo-social-icons/svg/social-1_round-facebook.svg'
import twitterLogin from '../assets/icons/nucleo-social-icons/svg/social-1_round-twitter.svg'
import instaLogin from '../assets/icons/nucleo-social-icons/svg/social-1_round-instagram.svg'

class User extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            candidateDetails: [],
            selectedCandidate: {},
            selectedCandidateIndex: 0
        }
    }

    componentDidMount() {
        return this.getCandidates()
    }

    getCandidates = () => {
        this.setState({
            candidateDetails: Candidates,
            selectedCandidate: Candidates[0]
        })
        return;
    }

    viewSelectedCandidate = (candidateIndex) => {
        const { candidateDetails } = this.state;
        if (!candidateDetails || !Array.isArray(candidateDetails) || !candidateDetails[candidateIndex]) {
            return Promise.reject("Unable to view the selected candidate")
        }
        this.setState({ selectedCandidate: candidateDetails[candidateIndex], selectedCandidateIndex: candidateIndex })
    }

    voteCandidate = () => {
        const { selectedCandidateIndex, selectedCandidate } = this.state;
        console.log("Voted for the Candidate ", selectedCandidate.name)
        //TODO: Make API Call to vote the Candidate
        return;
    }

    getSelectedCandidate = () => {
        const { selectedCandidate } = this.state;
        if (!selectedCandidate || !Object.keys(selectedCandidate).length) {
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
                                src={require("assets/img/mike.jpg")}
                            />
                        </a>
                        <a href={selectedCandidate.website} target="_blank">
                            <h5 className="title">
                                {selectedCandidate.name}
                            </h5>
                        </a>
                        <p className="description">{selectedCandidate.party}</p>
                    </div>
                </CardBody>
                <CardFooter>
                    <hr />
                    <div className="button-container">
                        <Row>
                            <Col className="ml-auto" lg="3" md="6" xs="6">
                                <a href={selectedCandidate.social_media.facebook} target="_blank">
                                    <img src={fbLogin} alt="fb" />
                                </a>
                            </Col>
                            <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                                <a href={selectedCandidate.social_media.twitter} target="_blank">
                                    <img src={twitterLogin} alt="fb" />
                                </a>
                            </Col>
                            <Col className="mr-auto" lg="3">
                                <a href={selectedCandidate.social_media.instagram} target="_blank">
                                    <img src={instaLogin} alt="fb" />
                                </a>
                            </Col>
                        </Row>
                    </div>
                </CardFooter>
            </Card>
        )
    }

    getAllCandidates = () => {
        const { candidateDetails } = this.state;
        if (!candidateDetails || !Array.isArray(candidateDetails) || !candidateDetails.length) {
            return <></>;
        }
        return (
            <CardBody>
                {
                    candidateDetails.map((candidate, key) => {
                        // if (key == 0) {
                        //     return <></>;
                        // }
                        return (
                            <ul className="list-unstyled team-members">
                                <li>
                                    <Row>
                                        <Col md="2" xs="2">
                                            <div className="avatar">
                                                <img
                                                    alt="..."
                                                    className="img-circle img-no-padding img-responsive"
                                                    src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}
                                                />
                                            </div>
                                        </Col>
                                        <Col md="5" xs="5">
                                            {candidate.name} <br />
                                            <span className="text-muted">
                                                <small>{candidate.party}</small>
                                            </span>
                                        </Col>
                                        <Col className="text-right" md="5" xs="5">
                                            <Button
                                                color="primary"
                                                outline
                                                size="sm"
                                                onClick={() => this.viewSelectedCandidate(key)}
                                            >
                                                View
                                            </Button>
                                        </Col>
                                    </Row>
                                </li>
                            </ul>
                        )
                    })
                }
            </CardBody>
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
        const { selectedCandidate } = this.state;
        return (
            <CardBody>
                <Form>
                    <Row>
                        <Col className="pr-1" md="4">
                            <FormGroup>
                                <label>Party</label>
                                <p>{selectedCandidate.party}</p>
                            </FormGroup>
                        </Col>
                        <Col className="px-1" md="4">
                            <FormGroup>
                                <label>Name</label>
                                <p>{selectedCandidate.name}</p>
                            </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                            <FormGroup>
                                <label>Age</label>
                                <p>{selectedCandidate.age}</p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="12">
                            <FormGroup>
                                <label>Experience</label>
                                {this.getCandidateAgendaOrExperience("experience")}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="12">
                            <FormGroup>
                                <label>Agenda</label>
                                {this.getCandidateAgendaOrExperience("agenda")}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <div className="update ml-auto mr-auto">
                            <Button
                                className="btn-round"
                                color="primary"
                                // type="submit"
                                onClick={this.voteCandidate()}
                            >
                                Vote
                            </Button>
                        </div>
                    </Row>
                </Form>
            </CardBody>
        )
    }

    getCandidateProfile = () => {
        const { candidateDetails } = this.state;
        let Candidates = {}
        if (candidateDetails && Array.isArray(candidateDetails) && candidateDetails.length) {
            Candidates = candidateDetails[0]
        }
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="4">
                            {this.getSelectedCandidate(Candidates)}
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Candidates</CardTitle>
                                </CardHeader>
                                {this.getAllCandidates()}
                            </Card>
                        </Col>
                        <Col md="8">
                            <Card className="card-user">
                                <CardHeader>
                                    <CardTitle tag="h5">Profile</CardTitle>
                                </CardHeader>
                                {this.getSelectedCandidateProfileDetails()}
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }

    render() {
        return this.getCandidateProfile()
    }

}

export default User;
