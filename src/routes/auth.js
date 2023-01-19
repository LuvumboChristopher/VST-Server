const { Router } = require('express');
const { signup, login, logout, protected } = require('../controllers/auth')
const { isAuth } = require('../middlewares/isAuth')

const router = Router();

router.post('/signup', signup);
router.post('/login', login)
router.get('/logout', isAuth, logout)
router.get('/protected', isAuth, protected)


module.exports = router;