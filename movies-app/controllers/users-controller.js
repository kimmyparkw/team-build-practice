const bcrypt = require('bcryptjs')
const User = require('../models/User')

const usersController = {}

usersController.create = (req, res, next) => {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(req.body.password, salt)
    new User({
        username: req.body.username,
        email: req.body.email,
        password_digest: hash,
    }).save().then(user => {
        if (err) return next(err)
        res.status(201).json({
            message: 'User successfully created!',
            auth: true,
            data: {
                user,
            }
        })
    }).catch(next)
}

modules.exports = usersController