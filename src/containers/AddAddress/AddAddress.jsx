import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddAddress.scss';
import { grabStates, addAddress } from '../../actions';
import { Link } from 'react-router-dom';

class AddAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primary: false,
      address_name: '',
      street: '',
      apt_suite: '',
      city: '',
      state_id: 0,
      country: '',
      zip: '',
      active: true,
      user_id: '',
      success: 'hide-div'
    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      user_id: this.props.user.id
    })
    return this.props.grabStates();
  }

  handleInputOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    return this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      primary: false,
      address_name: this.state.address_name,
      apt_suite: this.state.apt_suite,
      city: this.state.city,
      country: this.state.country,
      state_id: this.state.state_id,
      street: this.state.street,
      user_id: this.state.user_id,
      zip: this.state.zip
    }

    this.props.addAddress(data);

    this.setState({
      primary: false,
      address_name: '',
      street: '',
      apt_suite: '',
      city: '',
      state_id: 0,
      country: '',
      zip: '',
      active: true,
      user_id: '',
      success: 'display-div'
    })

  }

  render() {
    console.log(this.state)

    const allStates = this.props.states

    let stateDropdown = '';
    if (allStates[0]) {
      stateDropdown = allStates[0].map((state, idx) => {
        return <option value={state.id}>{state.name} - {state.postal_code}</option>;
      });
    }

    const linkBack = `/profiles/${this.props.user.id}`;

    const checkFormFilled = this.state.address_name.length > 0 && this.state.street.length > 0 && this.state.state_id > 0 && this.state.zip.length > 0 && this.state.city.length > 0;

    return (
      <div className="add-address">

        <h1> Add Shipping Address</h1>

        <form>
          <div className="input-div">
            <label className="input-label" htmlFor="address_name">
              Deliver To:
            </label>
            <input
              className="name-input"
              className="input"
              type="text"
              name="address_name"
              placeholder="Deliver To"
              value={this.state.address_name}
              onChange={this.handleInputOnChange}
              maxLength="100"
              required
            />
          </div>

          <div className="input-div">
            <label className="input-label" htmlFor="street">
              Street:
            </label>
            <input
              className="name-input"
              className="input"
              type="text"
              name="street"
              placeholder="Street"
              value={this.state.street}
              onChange={this.handleInputOnChange}
              maxLength="100"
              required
            />
          </div>

          <div className="input-div">
            <label className="input-label" htmlFor="apt_suite">
              Apartment Suite:
            </label>
            <input
              className="name-input"
              className="input"
              type="text"
              name="apt_suite"
              placeholder="Apt, Suite"
              value={this.state.apt_suite}
              onChange={this.handleInputOnChange}
              maxLength="50"
              required
            />
          </div>

          <div className="input-div">
            <label className="input-label" htmlFor="city">
              City:
            </label>
            <input
              className="name-input"
              className="input"
              type="text"
              name="city"
              placeholder="City"
              value={this.state.city}
              onChange={this.handleInputOnChange}
              maxLength="100"
              required
            />
          </div>

          <div className="input-div">
          <label className="input-label" htmlFor="country">
              State:
            </label>
            <select
              name="state_id"
              className="select"
              value={this.state.state_id}
              onChange={this.handleInputOnChange}
              required
            >
              <option value="">Choose a State</option>
              {stateDropdown}

            </select>
          </div>

          <div className="input-div">
            <label className="input-label" htmlFor="zip">
              Zip:
            </label>
            <input
              className="name-input"
              className="input"
              type="number"
              name="zip"
              placeholder="Zip Code"
              value={this.state.zip}
              maxLength="10"
              onChange={this.handleInputOnChange}
              required
            />
          </div>

          <div className="input-div">
            <label className="input-label" htmlFor="country">
              Country:
            </label>
            <input
              className="name-input"
              className="input"
              type="text"
              name="country"
              placeholder="Country"
              value={this.state.country}
              onChange={this.handleInputOnChange}
              maxLength="100"
              required
            />
          </div>

          <button disabled={!checkFormFilled} className="submit-item-button" onClick={this.handleSubmit}>
                  Submit
          </button>

        </form>
        <div className={this.state.success}><h1>Address Successfully Added!</h1>
        <p><Link to={linkBack}>Back To Profile</Link></p></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    states: state.itemReducer.states,
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    grabStates: () => dispatch(grabStates()),
    addAddress: (data) => dispatch(addAddress(data)),
  };
};

AddAddress = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddAddress);

export default AddAddress;
