const Joi = require('joi');

const name = Joi.alternatives().try(Joi.string().min(3).max(255).regex(/^[a-zA-Z\s]*$/), Joi.number()).optional();  // `name` puede ser un número o un string
const ruc = Joi.string().length(13).pattern(/^\d+$/).optional();  // `ruc` solo debe tener 13 caracteres numéricos
const direccion = Joi.string().min(5).max(255).optional();  // `direccion` es opcional en el PATCH
const estado = Joi.boolean().optional();  // `estado` es opcional en el PATCH

const createProviderSchema = Joi.object({
  name: Joi.string().min(3).max(255).regex(/^[a-zA-Z\s]*$/).required(),  // `name` debe ser string en POST
  ruc: Joi.string().length(13).pattern(/^\d+$/).required(),
  direccion: Joi.string().min(5).max(255).required(),
  estado: Joi.boolean().required(),
});

const updateProviderSchema = Joi.object({
  name,  // Puede ser un string o un número
  ruc,   // Puede ser opcional en el PATCH
  direccion, // Puede ser opcional en el PATCH
  estado, // Puede ser opcional en el PATCH
});

const getProviderSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

module.exports = { createProviderSchema, updateProviderSchema, getProviderSchema };
