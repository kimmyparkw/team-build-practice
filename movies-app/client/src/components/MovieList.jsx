import React from 'react'

class MovieList extends React.Component {
    constructor() {
        super()
        this.state = {
            movies: null,
            dataLoaded: false,
        }
    }

    componentDidMount() {
        fetch('api/movies', { credentials: 'include' })
        .then(res => res.json())
        .then(res => {
            this.setState({
                movies: res.data.movies,
                dataLoaded: true,
            })
        }).catch(err => console.log(err))
    }

    renderMovieList = () => {
        if (this.state.dataLoaded) {
            return <h1>Our movie list</h1>
        } else {
            return <p>Loading...</p>
        }
    }


    render() {
        return (
            <div className="movielist">
                {this.renderMovieList()}
            </div>
        )
    }
}


export default MovieList