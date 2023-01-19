const jwt = require('jsonwebtoken')

const isAuth = async (req, res, next) => {
  const token = await req.cookies.jwt
  if (!token) {
    return res.sendStatus(403)
  }
  try {
    const decodedData = jwt.verify(token, process.env.JWT)
    req.userId = decodedData.id
    req.userIsAdmin = decodedData.isAdmin
    return next()
  } catch {
    return res.status(403)
  }
}

module.exports = { isAuth }
