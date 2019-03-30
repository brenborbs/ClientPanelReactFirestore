import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import posed from 'react-pose'

import Spinner from '../layouts/Spinner'
import BalanceForm from './BalanceForm'

const Card = posed.div({
  from: { opacity: 0, x: -100 },
  to: { opacity: 1, x: 0, beforeChildren: true, staggerChildren: 100 }
})

const Row = posed.div({
  from: { y: 100, opacity: 0 },
  to: { y: 0, opacity: 1 }
})

const Li = posed.li({
  from: { opacity: 0, x: 100 },
  to: { opacity: 1, x: 0 }
})

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ''
  }

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value })

  balanceSubmit = e => {
    e.preventDefault()
    const { client, firestore } = this.props
    const { balanceUpdateAmount } = this.state

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount === '' ? '0' : balanceUpdateAmount)
    }
    firestore.update({ collection: 'clients', doc: client.id }, clientUpdate)
    this.setState({ showBalanceUpdate: false, balanceUpdateAmount: '' })
  }

  onDeleteClick = () => {
    const { client, firestore, history } = this.props
    if (window.confirm('Delete this client, are you sure?')) {
      firestore.delete({ collection: 'clients', doc: client.id }).then(() => history.push('/'))
    }
  }

  render() {
    const {
      props: { client },
      state: { showBalanceUpdate, balanceUpdateAmount },
      balanceSubmit,
      onChange,
      onDeleteClick
    } = this

    if (client) {
      return (
        <>
          <Row className="row" initialPose={'from'} pose={'to'}>
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" />
                Back to Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={onDeleteClick}>
                  Delete
                </button>
              </div>
            </div>
          </Row>
          <hr />
          <Card className="card" initialPose={'from'} pose={'to'}>
            <div className="card-header">
              <h3>
                {client.firstName} {client.lastName}
              </h3>
              <div className="card-body" />
              <div className="row">
                <div className="col-md-8 col sm-6">
                  <h4>
                    Client ID: <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col sm-6">
                  <h3 className="pull-right">
                    Balance:{' '}
                    <span
                      className={parseFloat(client.balance) > 0 ? 'text-danger' : 'text-success'}>
                      {' '}
                      £{parseFloat(client.balance).toFixed(2)}
                    </span>
                    <small>
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState(({ showBalanceUpdate }) => ({
                            showBalanceUpdate: !showBalanceUpdate
                          }))
                        }>
                        {' '}
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h3>
                  <BalanceForm
                    balanceSubmit={balanceSubmit}
                    showBalanceUpdate={showBalanceUpdate}
                    balanceUpdateAmount={balanceUpdateAmount}
                    change={onChange}
                  />
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <Li className="list-group-item">Contact Email: {client.email}</Li>
                <Li className="list-group-item">Contact Phone: {client.phone}</Li>
              </ul>
            </div>
          </Card>
        </>
      )
    } else {
      return <Spinner />
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired,
  client: PropTypes.object
}

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered: { client } } }, props) => ({
    client: client && client[0]
  }))
)(ClientDetails)
