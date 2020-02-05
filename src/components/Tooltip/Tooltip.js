import React from 'react';
import './Tooltip.css'

class TooltipClass extends React.Component {
    static defaultProps = {
        color: 'blue', // green
      };
    render() {

      console.log(this.props)
      return (
        <span className='Tooltip'>
          <span
            className='Tooltip-content'
            style={{ color: this.props.color }}
          >
            {this.props.children}
          </span>
          <div className='Tooltip-message'>
            {this.props.message}
          </div>
        </span>
      )
    }
  }


export default TooltipClass;