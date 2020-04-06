import React from 'react';
import SVG from './shape-components/SVG.js'
import Tool from './interface-components/Tool.js'
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      activeTool: ''
     };
    this.activeTool = this.activeTool.bind(this)
  }

  activeTool(tool) {
    if (tool !== 'Clear') {
      this.setState({activeTool: tool})
    }
  }

  render() {
    // Setup the tool buttons
    let toolList = ['Select', 'Vertex', 'Line', 'Corner Rectangle', 'Center Rectangle', 'Clear']
    toolList = toolList.map(a => <Tool
      key={`button${a}`}
      type={a}
      className='button'
      on={a === this.state.activeTool}
      activeTool={this.activeTool} />)

    return (
      <div>
        <div>
          {toolList}
        </div>
        <SVG width='800' height='400' />      
      </div>
    );
  }
}

export default App;