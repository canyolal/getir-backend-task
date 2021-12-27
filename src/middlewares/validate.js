//validate payload by comparing request.body(source) and joi.object(schema)
const validate = ( schema, source) => (request,response,next) => {

  const { value, error } = schema.validate(request[source])
  if (error) {
    const errorMessage = error?.details?.map((detail) => detail?.message).join(', ')
    return response.status(400).send({code:400, msg: errorMessage, records:[] })
  }
  Object.assign(request, value)
  return next()
}

module.exports = { validate }