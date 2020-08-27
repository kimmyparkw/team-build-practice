const express = require('express')
const authRouter = express.Router()
const passport = require('../services/auth/local')
const authHelpers = require('../services/auth/auth-helpers')
const usersController = require('../controllers/users-controller')

//new user data being passed to usersController to create to new user
authRouter.post('/register', usersController.create)

