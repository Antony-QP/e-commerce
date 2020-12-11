const express = require ('express')

const router = express.Router()

// Routes
router.get('/user', (req, res) => {
    res.json({
        data : "You hit a user API endpoint"
    })
})

module.exports = router