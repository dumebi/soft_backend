const Joi = require('@hapi/joi');
const HttpStatus = require('http-status-codes');
const {
  handleError
} = require('../utils/utils');

exports.init_token = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      name: Joi.string().required().label("Token name"),
      symbol: Joi.string().required().label("Token symbol"),
      supply: Joi.number().required().label("Token total supply"),
      rate: Joi.number().required().label("Token rate in BA")
    })
    await Joi.validate(req.body, schema);
    next()
  } catch (error) {
    return handleError(req, res, HttpStatus.PRECONDITION_FAILED, error.details, null)
  }
}

exports.buy_sell_token = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      price: Joi.number().required().label("Token price in BA"),
      amount: Joi.number().required().label("Number of tokens"),
    })
    await Joi.validate(req.body, schema);
    next()
  } catch (error) {
    return handleError(req, res, HttpStatus.PRECONDITION_FAILED, error.details, null)
  }
}

exports.cancel_token = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      price: Joi.number().required().label("Token price in BA"),
      type: Joi.string().required().label("Token transaction type")
    })
    await Joi.validate(req.body, schema);
    next()
  } catch (error) {
    return handleError(req, res, HttpStatus.PRECONDITION_FAILED, error.details, null)
  }
}

exports.token_params = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      id: Joi.string().required().label("Token ID")
    })
    await Joi.validate(req.params, schema);
    next()
  } catch (error) {
    return handleError(req, res, HttpStatus.PRECONDITION_FAILED, error.details, null)
  }
}
