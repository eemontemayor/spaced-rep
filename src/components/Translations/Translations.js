import React,{Component} from 'react';
import TransItem from './TransItem.js'

class Translations extends Component{



  render(){
      console.log(this.props.results)

      const resultItems = this.props.results.map((item,index)=>{
          return <li key={index} ><TransItem original={item.translation} translation={item.segment} definition={item.xxx} /></li>
      })
      return (
          <ul className='trans-list'>{resultItems}</ul>
      )
  }
}
export default Translations