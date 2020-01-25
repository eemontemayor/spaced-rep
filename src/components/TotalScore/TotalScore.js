import React, { Component} from 'react';
import LangContext from '../../contexts/LangContext'
export default class TotalScore extends Component {
    static contextType = LangContext
    render() {
        console.log(this.props)
        return(
            <div>   
                Total correct answers: {this.context.totalScore}       
            </div>
        )
    }
   
}