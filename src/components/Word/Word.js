import React from 'react';
import './Word.css'
export default function Word(props){


    return(
        <div className="word-card">
            <h4>{props.original}</h4>        
            <p>correct answer count: {props.correct_count}</p>
            <p>incorrect answer count: {props.incorrect_count}</p>        
        </div>
    )
}