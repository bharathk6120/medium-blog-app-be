const { DataTypes } = require('sequelize');
const sequelize = require('./db.connection');

const user = sequelize.define('users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.STRING,
    email_id: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    singn_in_type: DataTypes.STRING,
    email_verfied_at: DataTypes.STRING,
    deactivated_at: DataTypes.DATE,
    delete_requested_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

module.exports = user;
