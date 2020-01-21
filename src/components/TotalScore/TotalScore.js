import React from 'react';

export default function TotalScore(props){
    
console.log(props.score);
    return(
        <div>   
            Total correct answers: {props.score}       
        </div>
    )
}