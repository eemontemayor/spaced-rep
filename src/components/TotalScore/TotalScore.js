import React, { Component} from 'react';
import LangContext from '../../contexts/LangContext'
// import './TotalScore.css'
export default class TotalScore extends Component {
    static contextType = LangContext
    render() {
        console.log(this.props)
        return(
            <>  
                <h3 className='total-score'>
            Total correct answers: 
                </h3>
                 <h2 className='score-num'>
                    
                    {this.props.score}       
                    </h2>
            </>
        )
    }
   
}