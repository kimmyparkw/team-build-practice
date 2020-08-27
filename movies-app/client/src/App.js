import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
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

  componentDidMount() {
    fetch('/api/auth/verify', { credentials: 'include' })
      .then(res => res.json())
      .then(res => {
        this.setState({
          auth: res.auth,
          user: res.data.user,
        })
      }).catch(err => console.log(err))
  }

  handleLoginSubmit = (e, data) => {
    e.preventDefault()
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(res => {
      console.log(res)
      this.setState({
        auth: res.auth,
        user: res.data.user,
      })
    }).catch(err => console.log(err))
  }

  handleRegisterSubmit = (e, data) => {
    e.preventDefault()
    fetch('/api/auth/register', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(res => {
      this.setState({
        auth: res.auth,
        user: res.data.user,
      })
    }).catch(err => console.log(err))
  }

  logout = () => {
    fetch('/api/auth/logout', {
      credentials: 'include',
    }).then(res => res.json())
    .then(res => {
      this.setState({
        auth: res.auth,
        user: res.data.user,
      })
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header logout={this.logout} />
          <div className="container">
            <Route exact path='/' component={Home} />
            <Route exact path='/login' render={() => (
              this.state.auth
              ? <Redirect to='/dashboard' />
              : <Login handleLoginSubmit={this.handleLoginSubmit} />
            )}/>
            <Route exact path='/register' render={() => (
              this.state.auth
              ? <Redirect to='/dashboard' />
              : <Register handleRegisterSubmit={this.handleRegisterSubmit} />
            )}/>
            <Route exact path='/dashboard' render={() => (
              !this.state.auth
              ? <Redirect to='/login' />
              : <Dashboard user={this.state.user} />
            )} />
            <Route exact path='/movies' render={() => <MovieList auth={this.state.auth} />} />
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
