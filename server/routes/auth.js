const express = require ('express')

const router = express.Router()

// Middlewares
const {authCheck} = require('../middlewares/auth')

// Import Controllers
const { createOrUpdateUser } = require('../controllers/auth')
const { currentUser } = require('../controllers/auth')

// Routes
router.post('/create-or-update-user', authCheck, createOrUpdateUser)
router.post('/current-user', authCheck, currentUser)


module.exports = router