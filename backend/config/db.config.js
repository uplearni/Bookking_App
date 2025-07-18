const { parse } = require('pg-connection-string');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:your_password@localhost:5432/booking_system';
const config = parse(DATABASE_URL);

module.exports = {
  HOST: config.host || 'localhost',
  USER: config.user || 'postgres',
  PASSWORD: config.password || 'your_password',
  DB: config.database || 'booking_system',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};