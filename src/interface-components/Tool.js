import React from 'react'

const Tool = (props) => {

  const clickHandler =() => {
      props.activeTool(props.type)
    }

  return (
    <button
      id={props.type}
      value={props.type}
      className={props.className + (props.on ? " on" : '')}
      onClick={clickHandler}
    >
      {props.type}
    </button>
  )
}

export default Tool;