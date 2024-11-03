const { DataTypes } = require('sequelize');
const sequelize = require('./db.connection');

const Test = sequelize.define('test',
  {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  },
);

module.exports = Test;