import React from 'react'
import Movie from './Movie.jsx'
import MovieForm from './MovieForm.jsx'

class MovieList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: null,
            dataLoaded: false,
            auth: props.auth,
            currentlyEditing: null,
        }
    }

    componentDidMount() {
        this.getAllMovies()
    }

    getAllMovies = () => {
        fetch('api/movies', { credentials: 'include' })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({
                movies: res.data.movies,
                dataLoaded: true,
                auth: this.props.auth,
            })
        }).catch(err => console.log(err))
    }

    handleFormSubmit = (method, e, data, id) => {
        e.preventDefault()
        fetch(`/api/movies/${id || ''}`, {
            method: method,
            credentials: 'include',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(res => {
            console.log('submit res', res)
            this.getAllMovies()
        }).catch(err => console.log(err))
    }

    editMovie = (id) => {
        this.setState({
            currentlyEditing: id,
        })
    }

    deleteMovie = (id) => {
        fetch(`/api/movies/${id}`, {
            method: 'DELETE',
        }).then(res => res.json())
        .then(res => {
            console.log('delete res', res)
        }).catch(err => console.log(err))
    }

    renderMovieList = () => {
        if (this.state.dataLoaded) {
            return this.state.movies.map((movie) => {
                if (movie.id === this.state.currentlyEditing) 
                    return <MovieForm movie={movie} handleFormSubmit={this.handleFormSubmit} isAdd={false} key={movie.id}/>
                else return <Movie key={movie.id} movie={movie} auth={this.state.auth} editMoive={this.editMovie} />
            })
        } else {
            return <p>Loading...</p>
        }
    }


    render() {
        return (
            <div className="movielist">
                {this.state.auth ? <MovieForm handleFormSubmit={this.handleFormSubmit} isAdd={true} /> : ''}
                {this.renderMovieList()}
            </div>
        )
    }
}


export default MovieList