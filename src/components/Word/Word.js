import React from 'react';
import { Link } from "react-router-dom";
import './Word.css'
export default function Word(props){


    return (
        
        <div className="word-card">
            <Link to={`/edit-word/${props.id}`}>
            <h4>{props.original}</h4>        
            <p>correct: {props.correct_count}</p>
            <p>incorrect: {props.incorrect_count}</p>        
            </Link>
        </div>
    )
}