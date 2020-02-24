import React from 'react'

export default function TransItem(props) {
    return (
        <div>
            <h4>{props.original}</h4><p>{props.definition}</p><h4>{props.translation}</h4>
        </div>
    )
}