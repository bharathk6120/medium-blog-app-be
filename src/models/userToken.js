const { DataTypes } = require('sequelize');
const sequelize = require('./db.connection');

const user = sequelize.define('user_tokens',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.STRING,
    token_hash: DataTypes.STRING,
    type: DataTypes.STRING,
    expires_at: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

module.exports = user;
