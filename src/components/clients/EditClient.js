import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import posed from 'react-pose'

import Spinner from '../layouts/Spinner'

const Card = posed.div({
  from: { opacity: 0 },
  to: { opacity: 1, staggerChildren: 100, beforeChildren: true }
})

const Fgroup = posed.div({
  from: { y: 100, opacity: 0 },
  to: { y: 0, opacity: 1 }
})

class EditClient extends Component {
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

  submit = e => {
    e.preventDefault()
    const {
      state: { firstName, lastName, email, phone, balance },
      props: { firestore, history, client }
    } = this

    const updateClient = {
      firstName: firstName.val,
      lastName: lastName.val,
      email: email.val,
      phone: phone.val,
      balance: balance.val === '' ? '0' : balance.val
    }
    firestore
      .update({ collection: 'clients', doc: client.id }, updateClient)
      .then(() => history.push('/'))
  }

  onChange = ({ target: { name, value } }) => {
    this.setState(state => ({
      [name]: { ...state[name], val: value }
    }))
  }

  setClient = () => {
    const { client, loading } = this.props

    if (client && !loading && Object.values(this.state).every(({ val }) => val.length === 0)) {
      const { firstName, lastName, phone, balance, email } = client
      this.setState(state => ({
        firstName: { ...state.firstName, val: firstName },
        lastName: { ...state.lastName, val: lastName },
        email: { ...state.email, val: email },
        phone: { ...state.phone, val: phone },
        balance: { ...state.balance, val: balance }
      }))
    }
  }

  componentDidUpdate() {
    this.setClient()
  }

  componentDidMount() {
    this.setClient()
  }

  render() {
    const {
      props: {
        client,
        loading,
        settings: { disableBalanceOnEdit }
      },
      submit,
      state,
      onChange
    } = this
    if (client && !loading) {
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
                      disabled={field === 'balance' && disableBalanceOnEdit ? true : false}
                    />
                  </Fgroup>
                ))}
                <input type="submit" value="Submit" className="btn btn-primary btn-block" />
              </form>
            </div>
          </Card>
        </div>
      )
    } else {
      return <Spinner />
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  client: PropTypes.object
}

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered: { client }, status: { requesting } }, settings }, props) => ({
    client: client && client[0],
    loading: requesting.client,
    settings
  }))
)(EditClient)
