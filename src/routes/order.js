const router = require('express').Router()
const { isAuth } = require('../middlewares/isAuth')
const {
  createOrder,
  getOrder,
  getOrders,
  payOrder,
} = require('../controllers/order')

router.route('/').get(isAuth, getOrders)
router.route('/').post(isAuth, createOrder)
router.route('/:id').get(isAuth, getOrder)
router.route('/:id/pay').put(isAuth, payOrder)

module.exports = router
