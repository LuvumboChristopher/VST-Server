const { Router } = require('express')
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { isAuth, isAdmin } = require('../middlewares/isAuth')

const router = Router()

router.get('/', isAuth, getAllUsers)
router.get('/:id', isAuth, getUser)
router.delete('/:id', isAuth, deleteUser)
router.put('/:id', isAuth, updateUser)
router.delete('/:id', isAuth, deleteUser)



module.exports = router
