import React from 'react'

class Tool extends React.Component {
  constructor(props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
  }
  // $('.shapeTool').click(event => {
  //   if (activeTool == lineTool && $('.newLine').length) {killLine(s)}
  //   if ([cornerRectTool, centerRectTool].includes(activeTool) && $('.newRect').length) {killRect(s)}
  
  //   if (activeTool != '') {
  //     $(`#${activeTool}`).val('').removeClass('on')
  //   }
  //   if (activeTool == event.target.id) {
  //     activeTool = ''
  //   }
  //   else {
  //     activeTool = event.target.id
  //     $(`#${activeTool}`).val('on').addClass('on')
  //   }
  //   console.log("activeTool=" + activeTool)
  // })

clickHandler() {
    this.props.activeTool(this.props.type)
  }

render() {
  return (
    <button
      id={this.props.type}
      value={this.props.type}
      className={this.props.className + (this.props.on ? " on" : '')}
      onClick={this.clickHandler}
    >
      {this.props.type}
    </button>
  )
}
}

export default Tool;