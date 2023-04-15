import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressProofType: '',
      addressProofNumber: '',
      idProofType: '',
      idProofNumber: ''
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // Perform form validation and submission logic here
  };

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Address Proof:</label>
            <div className="radio-options">
              <div className="radio-option">
                <input
                  type="radio"
                  name="addressProofType"
                  value="aadhar"
                  checked={this.state.addressProofType === 'aadhar'}
                  onChange={this.handleInputChange}
                />
                <label>Aadhar Card</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  name="addressProofType"
                  value="epic"
                  checked={this.state.addressProofType === 'epic'}
                  onChange={this.handleInputChange}
                />
                <label>EPIC Number</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Address Proof:</label>
            <input
              type="text"
              name="addressProofNumber"
              value={this.state.addressProofNumber}
              onChange={this.handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Select ID Proof:</label>
            <div className="radio-options">
              <div className="radio-option">
                <input
                  type="radio"
                  name="idProofType"
                  value="pan"
                  checked={this.state.idProofType === 'pan'}
                  onChange={this.handleInputChange}
                />
                <label>PAN</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  name="idProofType"
                  value="smartcard"
                  checked={this.state.idProofType === 'smartcard'}
                  onChange={this.handleInputChange}
                />
                <label>Smart Card</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  name="idProofType"
                  value="drivinglicense"
                  checked={this.state.idProofType === 'drivinglicense'}
                  onChange={this.handleInputChange}
                />
                <label>Driving License</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">ID Proof:</label>
            <input
              type="text"
              name="idProofNumber"
              value={this.state.idProofNumber}
              onChange={this.handleInputChange}
              className="form-input"
            />
          </div>

          <button type="submit" className="submit-btn">
            Verify
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
