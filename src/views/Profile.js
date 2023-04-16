/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import QRCode from "react-qr-code";
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: {
        "_id": "",
        "name": "",
        "soName": "",
        "pAddress": "",
        "idProof": "",
        "idType": "",
        "address": "",
        "privateKey": "",
        "mobileNumber": "",
        "isVerified": "",
        "isVoted": false,
        "location": "",
        "epicNumber": ""
      },
      copiedDigitalInk: ""
    }


  }

  componentDidMount() {
    let profile = localStorage.getItem('profile');
    profile = JSON.parse(profile);
    if (!profile || !Object.keys(profile).length) {
      profile = {}
    }
    this.setState({ profile })
  }

  updateDigitalInk = (digitalInk) => {
    if (!digitalInk) {
      return
    }
    this.setState({ copiedDigitalInk: digitalInk });
  }

  render() {
    let qrString = JSON.stringify(this.state.profile)
    qrString = JSON.parse(qrString)
    delete qrString.privateKey;
    qrString = JSON.stringify(qrString)
    return (
      <>
        <div className="content">
          <Row style={{ width: "100%" }}>
            <Card className="card-user card-user-profile">
              <CardHeader>
                <CardTitle tag="h5"></CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="8">
                      <Row>
                        <Col className="px-3">
                          <FormGroup>
                            <label className="label-key">EPIC Number</label>
                            <p className="p-value">{this.state.profile.epicNumber}</p>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="px-3">
                          <FormGroup>
                            <label className="label-key">Registered by {" "} {this.state.profile.idType === "aadhar" ? "Aadhar" : 'EPIC'} Number</label>
                            <p className="p-value">{this.state.profile._id}</p>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="px-3">
                          <FormGroup>
                            <label className="label-key">Name</label>
                            <p className="p-value">{this.state.profile.name}</p>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="px-3">
                          <FormGroup>
                            <label className="label-key">
                              S.O. Name
                            </label>
                            <p className="p-value">{this.state.profile.soName}</p>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="px-3">
                          <FormGroup>
                            <label className="label-key">ID Proof</label>
                            <p className="p-value">{this.state.profile.idProof} </p>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="px-3">
                          <FormGroup>
                            <label className="label-key">Mobile Number</label>
                            <p className="p-value">
                              {this.state.profile.mobileNumber}
                            </p>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="px-3">
                          <FormGroup>
                            <label className="label-key">Address</label>
                            <p className="p-value">{this.state.profile.pAddress}</p>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>

                    <Col md="4">
                      <div className="card-user">
                        <div style={{ padding: "60px 74px 60px 51px" }}>
                          <QRCodeSVG
                            value={qrString}
                            size={256}
                            style={{ height: "100%", maxWidth: "100%", width: "100%" }}
                          />
                        </div>
                        <div>
                          <div className="button-container digitalInk">
                            DigitalInk
                            <CopyToClipboard text={this.state.profile.address}
                              onCopy={this.updateDigitalInk}>
                              {
                                this.state.copiedDigitalInk ?
                                  <span className="copy-digitalInk"> <i className="nc-icon nc-check-2" /></span>
                                  :
                                  <span className="copy-digitalInk"> <i className="nc-icon nc-single-copy-04" /></span>
                              }
                            </CopyToClipboard>
                          </div>
                        </div>
                        <div className="submit-btn-vote-container">
                          {
                            this.state.profile.isVoted ?
                              "Voted"
                              :
                              <Button
                                className="btn-round submit-btn-vote"
                                color="primary"
                                // type="submit"
                                disabled={this.state.profile.isVoted ? true : false}
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.props.history.push({
                                    pathname: "/candidates"
                                  })
                                }}
                              >
                                Vote
                              </Button>
                          }
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Row>
        </div >
      </>
    )
  }

}

export default Profile;