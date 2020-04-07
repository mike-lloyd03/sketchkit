import React from 'react';
import SVG from './shape-components/SVG.js'
import Tool from './interface-components/Tool.js'
import Vertex from './shape-components/Vertex.js'
import Line from './shape-components/Line.js'
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      activeTool: '',
      elements: [],
      activeElementKey: '',
      mouseMoveListener: false,
     };
    this.activeTool = this.activeTool.bind(this)
    this.svgClick = this.svgClick.bind(this)
    this.svgMouseMove = this.svgMouseMove.bind(this)
  }

  activeTool(tool) {
    if (tool !== 'Clear') {
      this.setState({activeTool: tool})
    }
    else if (tool === 'Clear') {
      this.setState({elements: []})
    }
  }

  svgClick(event) {
    const eventX = event.nativeEvent.offsetX
    const eventY = event.nativeEvent.offsetY
    this.setState(state => {
      let vertCount = state.elements.filter(a => a.type.name === 'Vertex').length
      let lineCount = state.elements.filter(a => a.type.name === 'Line').length
      // state.elements.map(a => console.log(a.type.name))
      switch(this.state.activeTool) {
        // case selectTool:
        //   selectElement(event)
        //   break
        case 'Vertex':
          return {elements: [...state.elements, <Vertex key={`vertex${vertCount+1}`} x={eventX} y={eventY} />]}
        case 'Line':
          return {
            mouseMoveListener: true,
            elements: [...state.elements, <Line key={`line${lineCount+1}`} x1={eventX} y1={eventY} />]
            }
        // case cornerRectTool:
        //   newRect(event, s, 'corner')
        //   break
        // case centerRectTool:
        //   newRect(event, s, 'center')
        //   break
        default:
          break
      }
    })
    console.log(this.state)
  }

  svgMouseMove(event) {
    console.log(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
  }

  render() {
    // Setup the tool buttons
    const toolList = ['Select', 'Vertex', 'Line', 'Corner Rectangle', 'Center Rectangle', 'Clear']
    let toolComponents = toolList.map(a =>
      <Tool
        key={`button${a.split(' ').join('')}`}
        type={a}
        className='button'
        on={a === this.state.activeTool}
        activeTool={this.activeTool}
      />
    )

    return (
      <div>
        <div>
          {toolComponents}
        </div>
        <SVG width='800' height='400' handleClick={this.svgClick} handleMouseMove={this.state.handleMouseMove ? this.svgMouseMove : null}>
          {this.state.elements}
        </SVG>      
      </div>
    );
  }
}

export default App;