const router = require('express').Router()
const { isAuth } = require('../middlewares/isAuth')


const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product')

router
  .route('/')
  .get(getAllProducts)
  .post( isAuth, createProduct)

router
  .route('/:id')
  .get(getProduct)
  .put(isAuth, updateProduct)
  .delete(isAuth, deleteProduct)

module.exports = router
