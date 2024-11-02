const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Test = sequelize.define('test',
  {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  },
);

module.exports = Test;
