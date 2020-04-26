import React, {useState, useEffect} from 'react'
import Vertex from './Vertex.js'
import $ from 'jquery'

const Line = (props) => {
  const [coords, setCoords] = useState({x2: props.x1, y2: props.y1})

  useEffect(() => {
    $('#svg').click(event => {
      event.stopPropagation()
      $('#svg').off('mousemove')
      $('#svg').off('click')
      try {props.onComplete()}
      catch {}
    })
    $('#svg').mousemove(event => {
      setCoords({x2: event.offsetX, y2: event.offsetY})
    })
    return () => {
      $('#svg').off('mousemove')
      $('#svg').off('click')
  }
  },[])

  return (
    <g>
      <Vertex x={props.x1} y={props.y1} />
      <line
        x1={props.x1} y1={props.y1}
        x2={coords.x2} y2={coords.y2}
        stroke='black'
        className='element line'
      />
      <Vertex x={coords.x2} y={coords.y2} />
    </g>
  )
}

export default Line;