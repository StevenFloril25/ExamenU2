const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const providersRouter = require('./providers.router'); // 👈 Agregar esta línea

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/providers', providersRouter); // 👈 Agregar esta línea
}

module.exports = routerApi;
