import React from 'react'
import posed from 'react-pose'

const Form = posed.form({
  closed: {
    height: '0',
    x: -50,
    opacity: 0,
    transition: { duration: 200 },
    applyAtEnd: { visibility: 'hidden' }
  },
  open: {
    height: 'auto',
    x: 0,
    opacity: 1,
    transition: { duration: 200 },
    applyAtStart: { visibility: '' }
  }
})

export default function BalanceForm({
  balanceSubmit,
  showBalanceUpdate,
  balanceUpdateAmount,
  change
}) {
  return (
    <Form onSubmit={balanceSubmit} pose={showBalanceUpdate ? 'open' : 'closed'}>
      <div className="input-group">
        <input
          type="number"
          className="form-control"
          name="balanceUpdateAmount"
          value={balanceUpdateAmount}
          onChange={change}
        />
        <div className="input-group-append">
          <input type="submit" value="Update" className="btn btn-outline-dark" />
        </div>
      </div>
    </Form>
  )
}
