const User = require('../models/User')
const handleErrors = require('../utils/handleErrors')
const createToken = require('../utils/createToken')

// Controlllers
module.exports.signup = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.create({ email, password })
    res.sendStatus(201)
  } catch (err) {
    // Envoi des erreurs au client
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

module.exports.protected = async (req, res) => {
  res.json({ userId: req.userId, userIsAdmin: req.userIsAdmin })
}

module.exports.logout = async (req, res) => {
  res.clearCookie('jwt').sendStatus(200)
}

module.exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id, user.isAdmin)
    res
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
      })
      .sendStatus(200)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
