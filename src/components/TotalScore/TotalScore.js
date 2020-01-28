import React, { Component} from 'react';
import LangContext from '../../contexts/LangContext'
// import './TotalScore.css'
export default class TotalScore extends Component {
    static contextType = LangContext
    render() {
        console.log(this.props)
        return(
            <>   
                Total correct answers: {this.context.totalScore}       
            </>
        )
    }
   
}