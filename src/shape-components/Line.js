import React, { Component } from 'react'
import Vertex from './Vertex.js'
import $ from 'jquery'

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      x2: this.props.x1,
      y2: this.props.y1,
     };
  }

componentDidMount() {
  $('#svg').click(event => {
    event.stopPropagation()
    $('#svg').off('mousemove')
    $('#svg').off('click')
    try {this.props.onComplete()}
    catch {}
  })
  $('#svg').mousemove(event => {
    this.setState({x2: event.offsetX, y2: event.offsetY})
  })
}

componentWillUnmount() {
  $('#svg').off('mousemove')
  $('#svg').off('click')
}

  render() {
    return (
      <g>
        <Vertex x={this.props.x1} y={this.props.y1} />
        <line
          x1={this.props.x1} y1={this.props.y1}
          x2={this.state.x2} y2={this.state.y2}
          stroke='black'
          className='element line'
        />
        <Vertex x={this.state.x2} y={this.state.y2} />
      </g>
    );
  }
}

export default Line;

/*
// ---- Non-React Code ----
export const newLine = (parentEvent, svg) => {
  // need to add a way to get the coords of a vertex if
  // the user starts drawing a line on that vertex so it
  // snaps the line start to that vertex
  const eventX1 = parentEvent.offsetX
  const eventY1 = parentEvent.offsetY
  let eventX2
  let eventY2

  // Check if there is an element with the .newLine class.
  if (!$('.newLine').length) {
    newVertex(eventX1, eventY1, svg, {className: 'newVert'})
    svg.line(eventX1, eventY1, eventX1, eventY1)
      .attr({stroke: 'black'})
      .addClass('newLine line') // Add .newLine to track the line endpoint
    newVertex(eventX1, eventY1, svg, {className: 'newVert'})

    // Create a mousemove handler to track the movement of
    // the line endpoint. This also needs to be killed if 
    // the tool changes.
    svg.mousemove(event => {
      eventX2 = event.offsetX
      eventY2 = event.offsetY
      const mouseCoordsArr = [
        {x2: eventX2, y2: eventY2},
        {x2: eventX1, y2: eventY2},
        {x2: eventX2, y2: eventY1}
      ]

      let mouseCoords = !shiftKey ? mouseCoordsArr[0] :
      Math.abs(eventX2 - eventX1) >= Math.abs(eventY2 - eventY1) ?
      mouseCoordsArr[2] : mouseCoordsArr[1]

      svg.select('.newLine').attr(mouseCoords)
      svg.select('.newVert:last-of-type').attr({cx: mouseCoords.x2, cy: mouseCoords.y2})
    })
  } else {

    // And then kill the event listener here
    svg.unmousemove()

    // Add the endpoint vertex
    // newVertex(svg.select('.newLine').attr('x2'), svg.select('.newLine').attr('y2'), svg)
    // Finish out the line
    $('.newLine')
    .addClass('element')
    .removeClass('newLine') // Remove .newLine because we are done
    $('.newVert:nth-last-of-type(2)').removeClass('newVert')
    $('.newVert:last-of-type').removeClass('newVert')
    
  }
}
*/