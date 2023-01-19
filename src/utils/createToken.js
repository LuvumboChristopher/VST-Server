const jwt = require('jsonwebtoken')

const createToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT, {
    expiresIn: 3 * 24 * 60 * 60,
  })
}

module.exports = createToken
