import React, { Component } from 'react'
import './layout.css'
export default class Layout extends Component {

    state = {

    }


  render() {
    return (
      <div>
        Header
        {this.props.children}
        footer 
      </div>
    )
  }
}
