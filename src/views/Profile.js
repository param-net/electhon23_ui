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

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: {
        "_id": "615866165332",
        "name": "Pujya Kumar",
        "soName": "Shishir Kumar",
        "pAddress": "Door no:15, Opp. Dhobighat, near OG Varier Bakery, 3rd Block, Rajajinagar, Bengaluru, Karnataka-560010",
        "idProof": "HLKPK7900M",
        "idType": "aadhar",
        "address": "0x6445b50dd4458924a53831882648e00a7db0eab1",
        "privateKey": "0x1ce54f539f25be05fb7ae2809058af8fdd283cea9e2eb214d726e27b606192f8",
        "mobileNumber": "5866165332",
        "isVerified": false,
        "location": "Rajaji Nagar"
      }

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

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <CardBody style={{ padding: "50px" }}>
                  <QRCodeSVG
                    value={this.state.address}
                    size={256}
                    style={{ height: "100%", maxWidth: "100%", width: "100%" }}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container digitalInk">
                    DigitalInk
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Profile</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="px-3">
                        <FormGroup>
                          <label className="label-key">{this.state.profile.idType === "aadhar" ? "Aadhar" : 'EPIC'} Number</label>
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
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div >
      </>
    )
  }

}

export default Profile;