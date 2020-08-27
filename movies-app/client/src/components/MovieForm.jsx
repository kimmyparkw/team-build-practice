import React from 'react'

class MovieForm extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            title: props.movie ? props.movie.title: '',
            genre: props.movie ? props.movie.genre: '',
            description: props.move ? props.movie.description: '',
        }
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: value,
        })
    }

    render() {
        return (
            <form onSubmit={(
                this.props.isAdd
                ?
                (e) => this.props.handleFormSubmit('POST', e, this.state)
                :
                (e) => this.props.handleFormSubmit('PUT', e, this.state, this.props.movie.id)
            )}>
                <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleChange()} />
                <input type="text" name="genre" placeholder="Genre" value={this.state.genre} onChange={this.handleChange()} />
                <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange()} />
                <input type="submit" value={this.props.isAdd ? 'Add movie!' : 'Edit movie'} />
            </form>
        )
    }
}




export default MovieForm