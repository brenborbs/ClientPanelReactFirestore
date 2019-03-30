import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import Alert from '../layouts/Alert'

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: false
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  submit = e => {
    e.preventDefault()
    const {
      props: { firebase },
      state: { email, password }
    } = this
    firebase.login({ email, password }).catch(err => {
      this.setState({ error: err.message })
    })
  }

  render() {
    const {
      state: { email, password, error },
      onChange,
      submit
    } = this
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {error ? <Alert message={error} messageType={'error'} /> : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Login
                </span>
              </h1>
              <form onSubmit={submit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={password}
                    onChange={onChange}
                  />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({}))
)(Login)
