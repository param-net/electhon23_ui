import React, { Component } from 'react';
import './Login.scss';

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

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'signIn',
      addressProofType: "aadhar", // addressProofType
      addressProof: "",
      idProofType: "pan", // idProofType
      idProofNumber: "",
      otpSent: false,
    }
  }

  handleTabClick = (tab) => {
    this.setState({
      activeTab: tab
    })
  }

  handleInputChange = (event) => {
    let key = event && event.target && event.target.id ? event.target.id : "";
    let value = event && event.target && event.target.value ? event.target.value : "";
    if (!key) {
      return;
    }
    this.setState({ [key]: value })
  }

  addressProofLabel = () => {
    const { addressProofType } = this.state;
    if (addressProofType === "aadhar") {
      return "Aadhar Card Number";
    }
    if (addressProofType === "epic") {
      return "EPIC Number"
    }
    return "Address Proof"
  }

  idProofLabel = () => {
    const { idProofType } = this.state;
    if (idProofType === "pan") {
      return "PAN Number";
    }
    if (idProofType === "smartcard") {
      return "Smart Card Number"
    }
    if (idProofType === "drivinglicense") {
      return "Driving License Number"
    }
    return "ID Proof"
  }

  handleSubmit = (e) => {

    const type = this.state.addressProofType;
    const addressProof = this.state.addressProof;
    const idProof = this.state.idProofNumber;
    // make API Call

    e.preventDefault()
  }


  renderSignUpForm = () => {

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="form-label">Select Address Proof</label>
          <div className="radio-options">
            <div className="radio-option">
              <input
                id="addressProofType"
                type="radio"
                name="addressProofType"
                value="aadhar"
                checked={this.state.addressProofType === 'aadhar'}
                onChange={this.handleInputChange}
              />
              <label className='radio-label'>Aadhar Card</label>
            </div>
            <div className="radio-option">
              <input
                id="addressProofType"
                type="radio"
                name="addressProofType"
                value="epic"
                checked={this.state.addressProofType === 'epic'}
                onChange={this.handleInputChange}
              />
              <label className='radio-label'>EPIC Number</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">{this.addressProofLabel()}</label>
          <input
            id="addressProof"
            type="text"
            name="addressProof"
            value={this.state.addressProof}
            onChange={this.handleInputChange}
            className="form-input"
          />
        </div>

        {
          this.state.addressProofType === "aadhar" ?
            <>
              <div className="form-group">
                <label className="form-label">Select ID Proof</label>
                <div className="radio-options">
                  <div className="radio-option">
                    <input
                      id="idProofType"
                      type="radio"
                      name="idProofType"
                      value="pan"
                      checked={this.state.idProofType === 'pan'}
                      onChange={this.handleInputChange}
                    />
                    <label className='radio-label'>PAN</label>
                  </div>
                  <div className="radio-option">
                    <input
                      id="idProofType"
                      type="radio"
                      name="idProofType"
                      value="smartcard"
                      checked={this.state.idProofType === 'smartcard'}
                      onChange={this.handleInputChange}
                    />
                    <label className='radio-label'>Smart Card</label>
                  </div>
                  <div className="radio-option">
                    <input
                      id="idProofType"
                      type="radio"
                      name="idProofType"
                      value="drivinglicense"
                      checked={this.state.idProofType === 'drivinglicense'}
                      onChange={this.handleInputChange}
                    />
                    <label className='radio-label'>Driving License</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{this.idProofLabel()}</label>
                <input
                  id="idProofNumber"
                  type="text"
                  name="idProofNumber"
                  value={this.state.idProofNumber}
                  onChange={this.handleInputChange}
                  className="form-input"
                />
              </div>
            </>
            :
            <></>
        }

        <Row>
          <Button
            className="btn-round submit-btn-custom"
            color="primary"
            type="submit"
          >
            {this.state.otpSent ? "Verify OTP" : "Send OTP"}
          </Button>
        </Row>
      </form>
    )

  }

  renderSignInForm = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <label>Mobile Number</label>
          <Input type="text" id="idProofNumber" name="idProofNumber" required onChange={this.handleInputChange} />
          <Row>
            <Button
              className="btn-round submit-btn-custom"
              color="primary"
              type="submit"
            >
              {this.state.otpSent ? "Verify OTP" : "Send OTP"}
            </Button>
          </Row>
        </FormGroup>
      </form>
    )
  }

  render() {
    const { activeTab } = this.state;
    return (
      <div className="container">
        <div className="imageContainer">
          <div className="image1"></div>
          <div className="image2"></div>
        </div>
        <div className="content">
          <div className='imageContainer2'>
            <div className="image3"></div>
            {/* <div className="image4"></div> */}
          </div>
          <div className="header">
            <h2 className='header-text'>Welcome to Digital Ink </h2>
          </div>
          <div className="login">
            <div className="tab-header">
              <div className={`tab ${activeTab === 'signIn' ? 'active' : ''}`} onClick={() => this.handleTabClick('signIn')}>
                SignIn
              </div>
              <div className={`tab ${activeTab === 'signUp' ? 'active' : ''}`} onClick={() => this.handleTabClick('signUp')}>
                Register
              </div>
            </div>
          </div>
          <div className='tab-body'>
            {activeTab === "signUp" ? this.renderSignUpForm() : this.renderSignInForm()}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
