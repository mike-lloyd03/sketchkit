import React from 'react'

class Tool extends React.Component {
  constructor(props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
  }

clickHandler() {
    this.props.activeTool(this.props.type)
  }

render() {
  return (
    <button
      id={this.props.type}
      value={this.props.type}
      className={this.props.className + (this.props.on ? " on" : '')}
      onClick={this.clickHandler}
    >
      {this.props.type}
    </button>
  )
}
}

export default Tool;