import React, {useState, useEffect} from 'react'
import $ from 'jquery'
import Vertex from './Vertex.js'

const Rect = (props) => {
  const [coords, setCoords] = useState({ 
    x1: props.x1, y1: props.y1,
    x2: props.x1, y2: props.y1,
    x3: props.x1, y3: props.y1,
    x4: props.x1, y4: props.y1,
   })

  useEffect(() => {
    $('#svg').click(event => {
      event.stopPropagation()
      $('#svg').off('mousemove')
      $('#svg').off('click')
      props.onComplete()
    })
    $('#svg').mousemove(event => {
      setCoords(prevCoords => {
        if (props.mode === 'corner') {
          return {
            ...prevCoords,
            x2: event.offsetX,
            x3: event.offsetX, y3: event.offsetY,
            y4: event.offsetY
          }
        }
        else if (props.mode === 'center') {
          const eventDX = props.x1-(event.offsetX-props.x1)
          const eventDY = props.y1-(event.offsetY-props.y1)
          return {
            ...prevCoords,
            x1: event.offsetX, y1: eventDY,
            x2: event.offsetX, y2: event.offsetY,
            x3: eventDX, y3: event.offsetY,
            x4: eventDX, y4: eventDY
          }
        }
      })
    })
    return (() => {
      $('#svg').off('mousemove')
      $('#svg').off('click')
    })
  },[])
  
    return (
      <g>
        <line x1={coords.x1} y1={coords.y1} x2={coords.x2} y2={coords.y2} stroke='black'
        className='element line'/>
        <line x1={coords.x2} y1={coords.y2} x2={coords.x3} y2={coords.y3} stroke='black'
        className='element line'/>
        <line x1={coords.x3} y1={coords.y3} x2={coords.x4} y2={coords.y4} stroke='black'
        className='element line'/>
        <line x1={coords.x4} y1={coords.y4} x2={coords.x1} y2={coords.y1} stroke='black'
        className='element line'/>
        <Vertex x={coords.x1} y={coords.y1} />
        <Vertex x={coords.x2} y={coords.y2} />
        <Vertex x={coords.x3} y={coords.y3} />
        <Vertex x={coords.x4} y={coords.y4} />
      </g>
    )
}

export default Rect;