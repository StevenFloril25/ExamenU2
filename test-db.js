const { Pool } = require('pg');

const pool = new Pool({
  user: 'espe',
  host: 'localhost', // Asegúrate de que esta IP sea correcta
  database: 'myStore',
  password: 'espe',
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error en la conexión a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos:', res.rows);
  }
  pool.end();
});
