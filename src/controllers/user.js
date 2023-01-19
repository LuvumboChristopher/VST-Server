const User = require('../models/User')
const asyncWrapper = require('../utils/asyncWrapper')
const handleErrors = require('../utils/asyncWrapper')


module.exports.getAllUsers = asyncWrapper(async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports.getUser = asyncWrapper(async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


module.exports.deleteUser = asyncWrapper(async (req, res) => {
  try {
    const user = await User.findAndDelete(req.params.id)
    res.status(200).send({ messagge: 'Utilisateur supprimé' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports.updateUser = asyncWrapper(async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    if(!user){
      res.status(401)
      throw new Error ('User not found')
    }


  if (user) {
    user.firstName = req.body.firstname || user.firstname
    user.lastName = req.body.lastname || user.lastname
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8)
    }

    if (req.body.addresses.billingAddress) {
      user.addresses.billingAddress.number =
        req.body.addresses.billingAddress.number ||
        user.addresses.billingAddress.number
      user.addresses.billingAddress.streetName =
        req.body.addresses.billingAddress.streetName ||
        user.addresses.billingAddress.streetName
      user.addresses.billingAddress.zipCode =
        req.body.addresses.billingAddress.zipCode ||
        user.addresses.billingAddress.zipCode
      user.addresses.billingAddress.city =
        req.body.addresses.billingAddress.city ||
        user.addresses.billingAddress.city
      user.addresses.billingAddress.country =
        req.body.addresses.billingAddress.country ||
        user.addresses.billingAddress.country
    }
    
    if (req.body.addresses.shippingAddress) {
      user.addresses.shippingAddress.number =
        req.body.addresses.shippingAddress.number ||
        user.addresses.shippingAddress.number

      user.addresses.shippingAddress.streetName =
        req.body.addresses.shippingAddress.streetName ||
        user.addresses.shippingAddress.streetName 

      user.addresses.shippingAddress.zipCode =
        req.body.addresses.shippingAddress.zipCode ||
        user.addresses.shippingAddress.zipCode

      user.addresses.shippingAddress.city =
        req.body.addresses.shippingAddress.city ||
        user.addresses.shippingAddress.city

      user.addresses.shippingAddress.country =
        req.body.addresses.shippingAddress.country ||
        user.addresses.shippingAddress.country
    }
  }

  await user.save()
  res.status(200).send({ messagge: 'Utilisateur mis à jour' })

  } catch(err){
    res.status(404).send({ message: err.message })
  }
})