/* eslint-disable no-useless-constructor */
import React from 'react'

const Vertex = (props) => {
    return (
      <circle cx={props.x} cy={props.y} r="2" className="vertex element" />
    );
}

export default Vertex;