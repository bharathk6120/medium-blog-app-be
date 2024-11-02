const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Test = sequelize.define('test',
  {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  },
);

module.exports = Test;
