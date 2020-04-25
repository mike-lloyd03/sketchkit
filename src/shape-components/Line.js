import React, {useState, useEffect} from 'react'
import Vertex from './Vertex.js'
import $ from 'jquery'

const Line = (props) => {
  const [x2, setX2] = useState(props.x1)
  const [y2, setY2] = useState(props.y1)

  useEffect(() => {
    $('#svg').click(event => {
      event.stopPropagation()
      $('#svg').off('mousemove')
      $('#svg').off('click')
      try {props.onComplete()}
      catch {}
    })
    $('#svg').mousemove(event => {
      setX2(event.offsetX)
      setY2(event.offsetY)
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
        x2={x2} y2={y2}
        stroke='black'
        className='element line'
      />
      <Vertex x={x2} y={y2} />
    </g>
  )
}

export default Line;