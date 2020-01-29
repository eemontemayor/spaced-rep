import React from 'react';
import './Word.css'
export default function Word(props){


    return(
        <div className="word-card">
            <h4>{props.original}</h4>        
            <p>correct: {props.correct_count}</p>
            <p>incorrect: {props.incorrect_count}</p>        
        </div>
    )
}