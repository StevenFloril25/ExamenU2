const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');

class ProvidersService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error('Unexpected error on idle client', err));
  }

  async create(data) {
    const { name, ruc, direccion, estado } = data;
    const query = 'INSERT INTO proveedores (name, ruc, direccion, estado) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, ruc, direccion, estado];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async find() {
    const query = 'SELECT * FROM proveedores';
    const result = await this.pool.query(query);
    return result.rows;
  }

  async findOne(id) {
    const query = 'SELECT * FROM proveedores WHERE id = $1';
    const result = await this.pool.query(query, [id]);

    if (result.rows.length === 0) {
      throw boom.notFound('Provider not found');
    }

    return result.rows[0];
  }

  async update(id, changes) {
    const provider = await this.findOne(id); // Primero busca si existe
    const query = `
      UPDATE proveedores
      SET name = $1, ruc = $2, direccion = $3, estado = $4
      WHERE id = $5 RETURNING *`;
    const values = [
      changes.name || provider.name,
      changes.ruc || provider.ruc,
      changes.direccion || provider.direccion,
      changes.estado !== undefined ? changes.estado : provider.estado,
      id,
    ];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  // ✅ Eliminar un proveedor
  async delete(id) {
    await this.findOne(id); // Verifica si existe antes de eliminar
    const query = 'DELETE FROM proveedores WHERE id = $1 RETURNING id';
    const result = await this.pool.query(query, [id]);

    if (result.rows.length === 0) {
      throw boom.notFound('Provider not found');
    }

    return { id };
  }
}

module.exports = ProvidersService;
