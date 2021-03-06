import React, { Component } from 'react'
import $ from 'jquery'
import Vertex from './Vertex.js'

class Rect extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      x1: this.props.x1, y1: this.props.y1,
      x2: this.props.x1, y2: this.props.y1,
      x3: this.props.x1, y3: this.props.y1,
      x4: this.props.x1, y4: this.props.y1,
     };
  }
  componentDidMount() {
    $('#svg').click(event => {
      event.stopPropagation()
      $('#svg').off('mousemove')
      $('#svg').off('click')
      this.props.onComplete()
    })
    $('#svg').mousemove(event => {
      this.setState((state, props) => {
        if (props.mode === 'corner') {
          return {
            x2: event.offsetX,
            x3: event.offsetX, y3: event.offsetY,
            y4: event.offsetY
          }
        }
        else if (props.mode === 'center') {
          const eventDX = this.props.x1-(event.offsetX-this.props.x1)
          const eventDY = this.props.y1-(event.offsetY-this.props.y1)
          return {
            x1: event.offsetX, y1: eventDY,
            x2: event.offsetX, y2: event.offsetY,
            x3: eventDX, y3: event.offsetY,
            x4: eventDX, y4: eventDY
          }
        //   const eventDX = eventX1-(eventX2-eventX1)
        // const eventDY = eventY1-(eventY2-eventY1)

        // svg.select(`#${rectSides[0]}`).attr({x1: eventDX, y1: eventDY, x2: eventX2, y2: eventDY})
        // svg.select(`#${rectSides[0]}v`).attr({cx: eventX2, cy: eventDY})
        // svg.select(`#${rectSides[1]}`).attr({x1: eventX2, y1: eventDY, x2: eventX2, y2: eventY2})
        // svg.select(`#${rectSides[1]}v`).attr({cx: eventX2, cy: eventY2})
        // svg.select(`#${rectSides[2]}`).attr({x1: eventX2, y1: eventY2, x2: eventDX, y2: eventY2})
        // svg.select(`#${rectSides[2]}v`).attr({cx: eventDX, cy: eventY2})
        // svg.select(`#${rectSides[3]}`).attr({x1: eventDX, y1: eventY2, x2: eventDX, y2: eventDY})
        // svg.select(`#${rectSides[3]}v`).attr({cx: eventDX, cy: eventDY})
        }
      })
    })
  }
  
  componentWillUnmount() {
    $('#svg').off('mousemove')
    $('#svg').off('click')
  }
  
    render() {
      return (
        <g>
          <line x1={this.state.x1} y1={this.state.y1} x2={this.state.x2} y2={this.state.y2} stroke='black'
          className='element line'/>
          <line x1={this.state.x2} y1={this.state.y2} x2={this.state.x3} y2={this.state.y3} stroke='black'
          className='element line'/>
          <line x1={this.state.x3} y1={this.state.y3} x2={this.state.x4} y2={this.state.y4} stroke='black'
          className='element line'/>
          <line x1={this.state.x4} y1={this.state.y4} x2={this.state.x1} y2={this.state.y1} stroke='black'
          className='element line'/>
          <Vertex x={this.state.x1} y={this.state.y1} />
          <Vertex x={this.state.x2} y={this.state.y2} />
          <Vertex x={this.state.x3} y={this.state.y3} />
          <Vertex x={this.state.x4} y={this.state.y4} />
        </g>
      );
    }
}

export default Rect;