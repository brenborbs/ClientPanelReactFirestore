import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
// import posed from 'react-pose'

class AppNavbar extends Component {
  state = {
    open: false
  }
  toggleOpen = () => this.setState(({ open }) => ({ open: !open }))

  logout = e => {
    e.preventDefault()
    const { firebase } = this.props
    firebase.logout()
  }

  render() {
    const {
      state: { open },
      toggleOpen,
      logout,
      props: {
        auth,
        settings: { allowRegistration }
      }
    } = this

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Client Panel
          </Link>
          <button className="navbar-toggler" type="button" onClick={toggleOpen}>
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`navbar-collapse${!open ? ' collapse' : ''}`} id="navbarMain">
            {auth.uid ? (
              <Fragment>
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a href="#!" className="nav-link">
                      {auth.email}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/settings" className="nav-link">
                      Settings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#!" className="nav-link" onClick={logout}>
                      Log out
                    </a>
                  </li>
                </ul>
              </Fragment>
            ) : null}
            {allowRegistration && 
            !auth.uid
            ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    )
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }))
)(AppNavbar)
