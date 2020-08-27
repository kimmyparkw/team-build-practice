import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import Footer from './components/Footer.jsx'
import MovieList from './components/MovieList.jsx'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      auth: false,
      user: null,
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Route exact path='/' component={Home} />
            <Route exact path='/movies' render={() => <MovieList auth={this.state.auth} />} />
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
