const express = require ('express')
const router = express.Router()

// Middlewares
const {authCheck, adminCheck} = require('../middlewares/auth')


// Import Controllers
const { create, listAll } = require('../controllers/product')

// Routes
router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', listAll);



module.exports = router