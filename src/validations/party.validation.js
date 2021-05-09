const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createParty = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('party', 'admin'),
  }),
};

const getPartys = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getParty = {
  params: Joi.object().keys({
    partyId: Joi.string().custom(objectId),
  }),
};

const updateParty = {
  params: Joi.object().keys({
    partyId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteParty = {
  params: Joi.object().keys({
    partyId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createParty,
  getPartys,
  getParty,
  updateParty,
  deleteParty,
};
