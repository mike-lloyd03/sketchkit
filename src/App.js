import React from 'react';
import SVG from './shape-components/SVG.js'
import Tool from './interface-components/Tool.js'
import Vertex from './shape-components/Vertex.js'
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      activeTool: '',
      elements: [],
     };
    this.activeTool = this.activeTool.bind(this)
    this.svgClick = this.svgClick.bind(this)

  }

  activeTool(tool) {
    if (tool !== 'Clear') {
      this.setState({activeTool: tool})
    }
  }

  svgClick(event) {
    const eventX = event.nativeEvent.offsetX
    const eventY = event.nativeEvent.offsetY
    this.setState(state => {
      switch(this.state.activeTool) {
        // case selectTool:
        //   selectElement(event)
        //   break
        case 'Vertex':
          return {elements: [...state.elements, {type: 'Vertex', x: eventX, y: eventY}]}
        // case lineTool:
        //   newLine(event, s)
        //   break
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
  }

  render() {
    // Setup the tool buttons
    const toolList = ['Select', 'Vertex', 'Line', 'Corner Rectangle', 'Center Rectangle', 'Clear']
    let toolComponents = toolList.map(a =>
      <Tool
        key={`button${a}`}
        type={a}
        className='button'
        on={a === this.state.activeTool}
        activeTool={this.activeTool}
      />
    )

    let elementComponents = this.state.elements.map((a, i) => <Vertex key={`vertex${i}`} x={a.x} y={a.y} />)

    return (
      <div>
        <div>
          {toolComponents}
        </div>
        <SVG width='800' height='400' handleClick={this.svgClick}>
          {elementComponents}
        </SVG>      
      </div>
    );
  }
}

export default App;