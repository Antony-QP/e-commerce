const express = require ('express')
const {authCheck} = require('../middlewares/auth')
const router = express.Router();

// Controllers
const { userCart, getUserCart, emptyCart, saveAddress, applyCouponToUserCart, createOrder, getOrders } = require('../controllers/user')

router.post('/user/cart', authCheck, userCart)
router.get('/user/cart', authCheck, getUserCart)
router.delete('/user/cart', authCheck, emptyCart)
router.post('/user/address', authCheck, saveAddress)
router.post('/user/order', authCheck, createOrder)
router.get('/user/orders', authCheck, getOrders)

// Coupon
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart)

module.exports = router