
const Sequelize  = require('sequelize');
module.exports = new Sequelize('codegig', 'akmal', '0312akmal', {
  host: 'localhost',
  dialect: 'postgres',
});
