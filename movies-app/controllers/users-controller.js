const bcrypt = require('bcryptjs')
const User = require('../models/User')

const usersController = {}

usersController.create = (req, res, next) => {
    console.log('Arrived - User Controller')
    const salt = bcrypt.genSaltSync()
    console.log("req.body", req.body)
    const hash = bcrypt.hashSync(req.body.password, salt)
    console.log("hash" ,hash)
    new User({
        username: req.body.username,
        email: req.body.email,
        password_digest: hash,
    }).save().then(user => {
        
        res.status(201).json({
            message: 'User successfully created!',
            auth: true,
            data: {
                user,
            }
        })
    }).catch(next)
    
}

module.exports = usersController