const express = require('express')
const { Home } = require('../app/control/demo')

const router = express.Router()

router.get('/', Home)

module.exports = router