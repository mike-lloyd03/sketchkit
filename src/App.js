import React, {useState, useEffect} from 'react';
import $ from 'jquery'
import SVG from './shape-components/SVG.js'
import Tool from './interface-components/Tool.js'
import Vertex from './shape-components/Vertex.js'
import Line from './shape-components/Line.js'
import Rect from './shape-components/Rect.js'
import './App.css';

const App = () => {
  const [activeTool, setActiveTool] = useState('')
  const [elements, setElements] = useState([])
  const [elementCount, setElementCount] = useState(0)
  const [activeElement, setActiveElement] = useState(null)

  
  const handleKeydown = (event) => {
    switch (event.key) {
      case 'Escape':
        if (activeElement) {
          console.log('escape')
          setElements(prevElements => prevElements.filter(element => element !== activeElement))
          setElementCount(prevElementCount => prevElementCount - 1)
          elementComplete()
        }
        break
      default:
        break
    }
  }

  useEffect(() => {
    $('body').keydown(event => handleKeydown(event))
    return () => {
      $('body').off('keydown')
    }
  }, [activeElement])

  const handleSVGClick =(event) => {
    const eventX = event.nativeEvent.offsetX
    const eventY = event.nativeEvent.offsetY
    let newElem

    switch(activeTool) {
      case 'Select':
        console.log(event)
        setActiveElement(event.target)
        break

      case 'Vertex':
        newElem = <Vertex key={`vertex${elementCount + 1}`} x={eventX} y={eventY} />
        setElements(prevElements => [...prevElements, newElem])
        setElementCount(prevElementCount => prevElementCount + 1)
        setActiveElement(newElem)
        break

      case 'Line':
        newElem = <Line key={`line${elementCount + 1}`}
          x1={eventX} y1={eventY}
          onComplete={elementComplete}
          />
        setElements(prevElements => [...prevElements, newElem])
        setElementCount(prevElementCount => prevElementCount + 1)
        setActiveElement(newElem)
        break

      case 'Corner Rectangle':
        newElem = <Rect key={`rect${elementCount + 1}`}
          x1={eventX} y1={eventY}
          onComplete={elementComplete}
          mode='corner'
          />
        setElements(prevElements => [...prevElements, newElem])
        setElementCount(prevElementCount => prevElementCount + 1)
        setActiveElement(newElem)
        break

      case 'Center Rectangle':
        newElem = <Rect key={`rect${elementCount + 1}`}
          x1={eventX} y1={eventY}
          onComplete={elementComplete}
          mode='center'
          />
        setElements(prevElements => [...prevElements, newElem])
        setElementCount(prevElementCount => prevElementCount + 1)
        setActiveElement(newElem)
        break

      default:
        break
    }
  }

  const handleActiveTool =(tool) => {
    if (tool === activeTool) {
      setActiveTool('')
    }
    else if (tool !== 'Clear') {
      setActiveTool(tool)
    }
    else if (tool === 'Clear') {
      setElements([])
    }
  }

  const elementComplete = () => {
    setActiveElement(null)
  }

  // Setup the tool buttons
  const toolList = ['Select', 'Vertex', 'Line', 'Corner Rectangle', 'Center Rectangle', 'Clear']
  const toolComponents = toolList.map(a =>
    <Tool
      key={`button${a.split(' ').join('')}`}
      type={a}
      className='button'
      on={a === activeTool}
      activeTool={handleActiveTool}
    />
  )

  return (
    <div>
      <div>
        {toolComponents}
      </div>
      <SVG width='800' height='400' handleClick={handleSVGClick} >
        {elements}
      </SVG>      
    </div>
  );
}

export default App;