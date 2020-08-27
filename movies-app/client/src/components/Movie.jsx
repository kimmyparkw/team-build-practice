import React from 'react'

function Movie(props) => {
    return (
        <div className="movie">
            <h1>{props.movie.title}</h1>
            <p>{props.movie.genre}</p>
            <p>{props.movie.description}</p>
        </div>
    )
}


export default Movie