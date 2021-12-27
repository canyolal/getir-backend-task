const assingmentRouter = require('express').Router()
const {validate} = require('../middlewares/validate')
const {postValidation} = require('../validations/assignment')
const {postRequest} = require('../controllers/assignment')

//method specification
assingmentRouter.route('/').post(validate(postValidation,'body'), postRequest)

module.exports = assingmentRouter