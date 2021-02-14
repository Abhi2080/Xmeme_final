const express = require('express');
const errorController = require("../controllers/errorControlles");
const router = express.Router();

router.route('/').get( errorController.errorRoute)

module.exports = router
