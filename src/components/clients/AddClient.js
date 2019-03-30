import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import posed from 'react-pose'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

const Card = posed.div({
  from: { opacity: 0 },
  to: { opacity: 1, staggerChildren: 100, beforeChildren: true }
})

const Fgroup = posed.div({
  from: { y: 100, opacity: 0 },
  to: { y: 0, opacity: 1 }
})

class AddClient extends Component {
  state = {
    firstName: {
      field: 'firstName',
      val: '',
      text: 'First Name',
      required: true,
      minLength: 2,
      type: 'text'
    },
    lastName: {
      field: 'lastName',
      val: '',
      text: 'Last Name',
      required: true,
      minLength: 2,
      type: 'text'
    },
    email: {
      field: 'email',
      val: '',
      text: 'Email',
      required: false,
      minLength: 0,
      type: 'email'
    },
    phone: {
      field: 'phone',
      val: '',
      text: 'Phone',
      required: true,
      minLength: 10,
      type: 'text'
    },
    balance: {
      field: 'balance',
      val: '',
      text: 'Balance',
      required: false,
      minLength: 0,
      type: 'number'
    }
  }

  onChange = ({ target: { name, value } }) => {
    this.setState(state => ({
      [name]: { ...state[name], val: value }
    }))
  }

  submit = e => {
    e.preventDefault()

    const {
      state: { firstName, lastName, email, phone, balance },
      props: { firestore, history }
    } = this

    const newClient = {
      firstName: firstName.val,
      lastName: lastName.val,
      email: email.val,
      phone: phone.val,
      balance: balance.val === '' ? 0 : balance.val
    }

    firestore.add({ collection: 'clients' }, newClient).then(() => history.push('/'))
  }

  // Map all form values at state

  render() {
    const {
      state,
      onChange,
      submit,
      props: {
        settings: { disableBalanceOnAdd }
      }
    } = this
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>
        <Card className="card" initialPose={'from'} pose={'to'}>
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={submit}>
              {Object.values(state).map(({ field, val, text, required, minLength, type }) => (
                <Fgroup className="form-group" key={field}>
                  <label htmlFor={field}>{text}</label>
                  <input
                    type={type}
                    className="form-control"
                    name={field}
                    minLength={minLength}
                    required={required}
                    onChange={onChange}
                    value={val}
                    disabled={field === 'balance' && disableBalanceOnAdd ? true : false}
                  />
                </Fgroup>
              ))}
              <input type="submit" value="Submit" className="btn btn-primary btn-block" />
            </form>
          </div>
        </Card>
      </div>
    )
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient)
