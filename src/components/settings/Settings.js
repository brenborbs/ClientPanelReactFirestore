import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from '../../actions/settingsActions'
import posed from 'react-pose'

const Card = posed.div({
  from: { opacity: 0 },
  to: { opacity: 1, staggerChildren: 100, beforeChildren: true }
})

const Settings = props => {
  const {
    setDisableBalanceOnAdd,
    setDisableBalanceOnEdit,
    setAllowRegistration,
    settings: { disableBalanceOnAdd, disableBalanceOnEdit, allowRegistration }
  } = props

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-6">
          <Link to="/" className="btn btn-link">
            <i className="fas fa-arrow-circle-left" /> Back To Dashboard
          </Link>
        </div>
      </div>
      <Card className="card" initialPose={'from'} pose={'to'}>
        <div className="card-header">Edit Settings</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Allow Registration</label>{' '}
              <input
                type="checkbox"
                name="allowRegistration"
                checked={allowRegistration}
                onChange={setAllowRegistration}
              />
            </div>
            <div className="form-group">
              <label>Disable Balance On Add</label>{' '}
              <input
                type="checkbox"
                name="disableBalanceOnAdd"
                checked={disableBalanceOnAdd}
                onChange={setDisableBalanceOnAdd}
              />
            </div>
            <div className="form-group">
              <label>Disable Balance On Edit</label>{' '}
              <input
                type="checkbox"
                name="disableBalanceOnAdd"
                checked={disableBalanceOnEdit}
                onChange={setDisableBalanceOnEdit}
              />
            </div>
          </form>
        </div>
      </Card>
    </Fragment>
  )
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
}

export default connect(
  (state, props) => ({
    settings: state.settings
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings)
