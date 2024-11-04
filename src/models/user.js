const { DataTypes } = require('sequelize');
const sequelize = require('./db.connection');

const User = sequelize.define('user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    user_id: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    email_verfied_at: DataTypes.STRING,
    deactivated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

module.exports = User;
