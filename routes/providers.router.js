const express = require('express');
const ProvidersService = require('../services/provider.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProviderSchema,
  updateProviderSchema,
  getProviderSchema,
} = require('../schemas/provider.schema');

const router = express.Router();
const service = new ProvidersService();

// ✅ Obtener todos los proveedores
router.get('/', async (req, res, next) => {
  try {
    const providers = await service.find();
    res.json(providers);
  } catch (error) {
    next(error);
  }
});

// ✅ Obtener un proveedor por ID
router.get(
  '/:id',
  validatorHandler(getProviderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const provider = await service.findOne(id);
      res.json(provider);
    } catch (error) {
      next(error);
    }
  }
);

// ✅ Crear un proveedor
router.post(
  '/',
  validatorHandler(createProviderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProvider = await service.create(body);
      res.status(201).json(newProvider);
    } catch (error) {
      next(error);
    }
  }
);

// ✅ Actualizar un proveedor
router.patch(
  '/:id',
  validatorHandler(getProviderSchema, 'params'),
  validatorHandler(updateProviderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const provider = await service.update(id, body);
      res.json(provider);
    } catch (error) {
      next(error);
    }
  }
);


// ✅ Eliminar un proveedor
router.delete(
  '/:id',
  validatorHandler(getProviderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(200).json({ message: `Provider with ID ${id} deleted` });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
