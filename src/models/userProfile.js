const { DataTypes } = require('sequelize');
const sequelize = require('./db.connection');

const user = sequelize.define('user_profiles',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.STRING,
    name: DataTypes.STRING,
    bio: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

module.exports = user;
