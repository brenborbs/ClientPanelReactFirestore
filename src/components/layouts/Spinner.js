import React, { Component } from 'react'
import posed from 'react-pose'

const transition = {
  duration: 600
}

const Spin = posed.div({
  from: { rotate: ({ fromRotation }) => fromRotation, transition, scale: 0.8 },
  to: { rotate: ({ toRotation }) => toRotation, transition, scale: 1.2 }
})

export default class Spinner extends Component {
  state = { pose: 'to', from: 0, to: 700 }

  setPose = () => {
    if (this.state.pose === 'to') {
      this.setState(({ to }) => ({
        pose: 'from',
        from: (to += 700),
        to: (to += 700)
      }))
    } else {
      this.setState({ pose: 'to' })
    }
  }

  render() {
    return (
      <div>
        <Spin
          native
          initialPose={'from'}
          pose={this.state.pose}
          fromRotation={this.state.from}
          onPoseComplete={this.setPose}
          toRotation={this.state.to}
          style={{
            height: '3rem',
            width: '3rem',
            border: '5px solid dodgerblue',
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            borderRadius: '50%',
            margin: '5rem auto'
          }}
        />
      </div>
    )
  }
}
