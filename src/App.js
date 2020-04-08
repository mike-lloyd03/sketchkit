import React from 'react';
import $ from 'jquery'
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
      elementCount: 0,
      activeElement: null,
      activeElementComplete: false,
     };
    this.setActiveTool = this.setActiveTool.bind(this)
    this.svgClick = this.svgClick.bind(this)
    this.elementComplete = this.elementComplete.bind(this)
    this.keydownHandler = this.keydownHandler.bind(this)

  }

  componentDidMount() {
    $('body').keydown(event => this.keydownHandler(event))
  }

  componentWillUnmount() {
    $('body').off('keydown')
  }

  keydownHandler(event) {
    // console.log(event.key)
    switch (event.key) {
      case 'Escape':
        if (!this.state.activeElementComplete) {
          this.setState(state => ({elements: state.elements.filter(element => element !== state.activeElement)}))
        }
        break
      default:
        break
    }
  }

  setActiveTool(tool) {
    if (tool === this.state.activeTool) {
      this.setState({activeTool: ''})
    }
    else if (tool !== 'Clear') {
      this.setState({activeTool: tool})
    }
    else if (tool === 'Clear') {
      this.setState({elements: []})
    }
  }

  svgClick(event) {
    const eventX = event.nativeEvent.offsetX
    const eventY = event.nativeEvent.offsetY
    let newElem

    this.setState(state => {
      switch(state.activeTool) {
        // case selectTool:
        //   selectElement(event)
        //   break
        case 'Vertex':
          newElem = <Vertex key={`vertex${state.elementCount + 1}`} x={eventX} y={eventY} />
          return {
            elements: [...state.elements, newElem],
            elementCount: state.elementCount + 1,
            activeElement: newElem
          }
        case 'Line':
          newElem = <Line key={`line${state.elementCount + 1}`}
            x1={eventX} y1={eventY}
            onComplete={this.elementComplete}
            />
          return {
            elementCount: state.elementCount + 1,
            elements: [...state.elements, newElem],
            activeElement: newElem,
            activeElementComplete: false
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
  }

  elementComplete() {
    this.setState({ activeElementComplete: false })
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
        activeTool={this.setActiveTool}
      />
    )

    return (
      <div>
        <div>
          {toolComponents}
        </div>
        <SVG width='800' height='400' handleClick={this.svgClick} >
          {this.state.elements}
        </SVG>      
      </div>
    );
  }
}

export default App;