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

import config from "../config.json"
import NotificationAlert from "react-notification-alert";

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

      // OTP send and verify
      mobileNumber: "",
      otp: ""
    }
    this.notificationAlert = React.createRef();
  }

  componentDidMount() {
    let profile = localStorage.getItem('profile');
    profile = profile && JSON.parse(profile);
    if (profile && Object.keys(profile).length) {
      this.props.history.push({
        pathname: '/profile'
      })
    }
  }

  notify = (message, color) => {
    if (!message || !color) {
      return;
    }
    var color = color;
    var type = "primary";
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
      place: "tr",
      message: message,
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7
    };
    this.notificationAlert.current.notificationAlert(options);
  };

  handleTabClick = (tab) => {
    if (this.state.activeTab === tab) {
      return;
    }
    this.setState({
      activeTab: tab,
      otpSent: false,
      otp: "",
      mobileNumber: ""
    })
  }

  handleInputChange = (event) => {
    let key = event && event.target && event.target.id ? event.target.id : "";
    let value = event && event.target && (event.target.value || event.target.value === 0) ? event.target.value : "";
    if (typeof value !== "string") {
      value = value.toSring();
    }
    if (!key) {
      return;
    }
    if (key === "addressProof" && this.state.addressProofType === "aadhar" && value && value.length > 12) {
      return;
    }
    if (key === "addressProof" && this.state.addressProofType === "epic" && value && value.length > 10) {
      return;
    }
    if (key === "idProofNumber" && this.state.idProofType === "pan" && value && value.length > 10) {
      return;
    }
    if (key === "idProofNumber" && this.state.idProofType === "drivinglicense" && value && value.length > 15) {
      return;
    }
    if (key === "idProofNumber" && this.state.idProofType === "smartcard" && value && value.length > 9) {
      return;
    }
    if (key === "otp" && value && value.length > 8) {
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

  signUp = (e) => {
    e.preventDefault();
    const type = this.state.addressProofType;
    const addressProof = this.state.addressProof;
    const idProof = this.state.idProofNumber;

    if (type === "aadhar" && (!addressProof || addressProof.length < 12)) {
      return this.notify("Invalid Aadhar Number length", "danger");
    }

    if (type === "epic" && (!addressProof || addressProof.length < 10)) {
      return this.notify("Invalid EPIC Number length", "danger");
    }

    // clear profile and on successfull verification set profile
    localStorage.removeItem("profile");

    return fetch(`${config["api-services"]}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "type": type,
        "addressProof": addressProof,
        "idProof": idProof
      }),
    }).then((res) => {
      return res && res.json()
    }).then((res) => {
      if (res && res.status) {
        this.notify(res && res.message, "success")
        this.setState({ otpSent: true })
      } else {
        this.notify(res && res.message, "warning")
        return;
      }
      return res;
    }).catch((err) => {
      this.notify("Failed to register", "warning")
      return err;
    })
  }

  sendOtp = (e) => {
    e.preventDefault();
    let mobileNumber = this.state.mobileNumber;
    if (!mobileNumber || mobileNumber.length < 10) {
      return this.notify("Invalid User Input, should be atleast 10 characters", "danger");
    }

    // clear profile and on successfull verification set profile
    localStorage.removeItem("profile");

    return fetch(`${config["api-services"]}register/sendOTP`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "mobileNumber": mobileNumber,
      }),
    }).then((res) => {
      return res && res.json()
    }).then((res) => {
      if (res && res.status) {
        this.notify(res && res.message, "success")
        this.setState({ otpSent: true })
        return
      } {
        this.notify(res && res.message, "warning")
        return;
      }
      return res;
    }).catch((err) => {
      this.notify("Failed to sent OTP", "warning")
      return err;
    })
  }

  verifyOtp = (e) => {
    e.preventDefault();
    let mobileNumber = this.state.mobileNumber;
    // validation while signup
    if (this.state.activeTab === "signUp") {
      mobileNumber = this.state.addressProof;
      if (this.state.addressProofType === "aadhar") {
        mobileNumber = mobileNumber && mobileNumber.substring(2, 12);
      }
      if (this.state.addressProofType === "epic") {
        mobileNumber = mobileNumber && mobileNumber.substring(3, 10);
        let subMobileNumber = mobileNumber;
        subMobileNumber = subMobileNumber && subMobileNumber.substring(0, 3);
        mobileNumber = mobileNumber + subMobileNumber;
      }
    }
    // validation while signin
    // not required

    // clear profile and on successfull verification set profile
    localStorage.removeItem("profile");


    const otp = this.state.otp;
    if (!otp || otp.length < 8) {
      this.notify("Failed to verify OTP, Invalid OTP length ");
      return;
    }

    return fetch(`${config["api-services"]}register/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "mobileNumber": mobileNumber,
        "otp": otp
      }),
    }).then((res) => {
      return res && res.json()
    }).then((res) => {
      if (res && res.status && res.message && Object.keys(res.message).length) {
        let message = Object.assign({}, res.message)
        localStorage.setItem("profile", JSON.stringify(message));
        this.props.history.push({
          pathname: "/profile"
        })
        this.notify("Successfully logged In", "success")
        return;
      } {
        this.notify("Failed to log In", "warning")
        return;
      }
      return res;
    }).catch((err) => {
      this.notify("Failed to log In", "warning")
      return err;
    })
  }


  renderSignUpForm = () => {

    return (
      <form onSubmit={this.state.otpSent ? this.verifyOtp : this.signUp}>
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
                required={true}
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
                required={true}
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
            required={true}
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
                      required={this.state.addressProofType === "epic" ? false : true}
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
                      required={this.state.addressProofType === "epic" ? false : true}
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
                      required={this.state.addressProofType === "epic" ? false : true}
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
                  required={this.state.addressProofType === "epic" ? false : true}
                />
              </div>
            </>
            :
            <></>
        }

        {
          this.state.otpSent ?
            <FormGroup>
              <label>OTP</label>
              <Input type="password" id="otp" name="otp" required onChange={this.handleInputChange} value={this.state.otp} />
            </FormGroup>
            :
            <></>
        }

        <Row>
          <Button
            className="btn-round submit-btn-custom"
            color="primary"
          // type="submit"
          >
            {this.state.otpSent ? "Verify OTP" : "Send OTP"}
          </Button>
        </Row>
      </form>
    )

  }

  renderSignInForm = () => {
    return (
      <form onSubmit={this.state.otpSent ? this.verifyOtp : this.sendOtp}>
        <FormGroup>
          <label>Mobile Number / Aadhar Number / Epic Number</label>
          <Input type="text" id="mobileNumber" name="mobileNumber" required onChange={this.handleInputChange} />
        </FormGroup>
        {
          this.state.otpSent ?
            <FormGroup>
              <label>OTP</label>
              <Input type="password" id="otp" name="otp" required onChange={this.handleInputChange} value={this.state.otp} />
            </FormGroup>
            :
            <></>
        }
        <Row>
          <Button
            className="btn-round submit-btn-custom"
            color="primary"
          // type="submit"
          >
            {this.state.otpSent ? "Verify OTP" : "Send OTP"}
          </Button>
        </Row>
      </form>
    )
  }

  render() {
    const { activeTab } = this.state;
    return (
      <>
        <NotificationAlert ref={this.notificationAlert} />
        <div className="container">
          <div className="imageContainer">
            <div className="image1"></div>
            <div className="image2"></div>
          </div>
          <div className="login-content">
            <div className='imageContainer2'>
              <div className="image3"></div>
            </div>
            <div className="header">
              <h2 className='header-text'>Welcome to DigitalInk </h2>
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
      </>
    );
  }
}

export default Login;
