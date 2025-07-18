const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.role = require('./role.model')(sequelize, Sequelize);
db.booking = require('./booking.model')(sequelize, Sequelize);

// Associations
db.role.belongsToMany(db.user, { through: 'user_roles' });
db.user.belongsToMany(db.role, { through: 'user_roles' });

module.exports = db;