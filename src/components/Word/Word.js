import React from 'react';
import './Word.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LangService from '../../services/lang-service';

export default function Word(props){
    function renderIcons() {
        if (props.translation) {
            return <div className='icon-container'>
                <button className='icon-btn-trash' type='click' onClick={() =>{LangService.deleteWordById(props.id)} }>
                            <FontAwesomeIcon size="lg" icon='trash-alt' />
                        </button>
                        <button className='icon-btn-pen' type='click' onClick={() => {alert('feature coming soon!')}}>
                            <FontAwesomeIcon size="lg" icon='pen' /> 
                        </button>
                    </div>
        }
    }
    
   const icons = renderIcons()
    
    return (
        <div className={props.translation?"word-card-large":"word-card"}>
            {icons}
            <h4 className='original'>{props.original}</h4>
            {props.translation? <h4 className='translation'>{props.translation}</h4>:null}      
            <p className='corr-count'>correct: {props.correct_count}</p>
            <p className='incorr-count'>incorrect: {props.incorrect_count}</p>        
        </div>
         
    )
}