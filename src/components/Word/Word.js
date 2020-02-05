import React from 'react';
import './Word.css'
export default function Word(props){

    console.log(props)
    return (
        <>
            <h4>{props.original}</h4>
            {props.translation? <h4>{props.translation}</h4>:null}      
            <p>correct: {props.correct_count}</p>
            <p>incorrect: {props.incorrect_count}</p>        
        </>
         
    )
}