const Order = require('../models/Order')
const asyncWrapper = require('../utils/asyncWrapper')

module.exports.createOrder = asyncWrapper( async (req, res, next) => {
  try {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.userId,
    })

    const order = await newOrder.save()
    res.status(201).send({ message: 'New Order Created', order })
  } catch (err) {
    console.log(err)
  }
})

module.exports.getOrders = asyncWrapper(async (req, res, next) => {
    const orders = await Order.find({ user: req.userId })
    if (orders) {
      res.send(orders)
    } else {
      res.status(404).send({ message: 'Order Not Found' })
    }
})

module.exports.getOrder = asyncWrapper(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
})

module.exports.payOrder = asyncWrapper(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    }

    const updatedOrder = await order.save()
    res.send({ message: 'Order Paid', order: updatedOrder })
  } else {
    res.status(404).send({ message: 'Order Not Found' })
  }
})
