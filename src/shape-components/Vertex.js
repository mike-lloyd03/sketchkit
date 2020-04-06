/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'

class Vertex extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <circle cx={this.props.x} cy={this.props.y} r="2" className="vertex element" />
    );
  }
}

export default Vertex;