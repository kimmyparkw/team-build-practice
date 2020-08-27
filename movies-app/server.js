//import dependencies
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const { initialize } = require('passport')

//initialize app and setup dotenv
const app = express()
require('dotenv').config()

//set up the middlewares
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
    session({
        key: process.env.SECRET_KEY,
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))

//set the port
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

//ROUTES

//Root Route
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//temporarily commented out until backend ready
const authRouter = require('./routes/auth-routes')
app.use('/api/auth', authRouter)
// const moviesRoutes = require('./routes/movies-routes')
// app.use('/api/movies', moviesRoutes)

//Error handlers
app.use('*', (req, res) => {
    res.status(400).json({
        message: 'Not Found!!'
    })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        error: err,
        message: err.message
    })
}) 