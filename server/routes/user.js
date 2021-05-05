const express = require ('express')
const {authCheck} = require('../middlewares/auth')
const router = express.Router();

// Controllers
const { userCart, getUserCart } = require('../controllers/user')

router.post('/user/cart', authCheck, userCart)
router.get('user/cart', authCheck, getUserCart)

module.exports = router