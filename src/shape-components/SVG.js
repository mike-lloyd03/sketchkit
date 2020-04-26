import React from 'react'

const SVG = (props) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      onClick={props.handleClick}
      id='svg'
    >
      {props.children}
    </svg>
  );
}

export default SVG;