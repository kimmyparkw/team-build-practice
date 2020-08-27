const express = require('express')
const authRouter = express.Router()
const passport = require('../services/auth/local')
const authHelpers = require('../services/auth/auth-helpers')
const usersController = require('../controllers/users-controller')

//new user data being passed to usersController to create to new user
authRouter.post('/register', usersController.create)

//route for user to login
authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/api/auth/verify',
    failureRedirect: '/api/auth/verify',
    failureFlash: true,
}))

//Verify user information
authRouter.get('/verify', (req, res) => {
    if (req.user) return res.status(200).json({
        message: 'ok',
        auth: true,
        data: {
            user: req.user,
        }
    })
    else return res.status(400).json({
        message: 'Login Failed',
        auth: false,
        data: {
            user: null
        }
    })
})

//Logout route
authRouter.get('/logout', (req, res) => {
    req.logout()
    res.json({
        message: 'Logged Out',
        auth: false,
        data: {
            user: null
        }
    })
})

module.exports = authRouter;