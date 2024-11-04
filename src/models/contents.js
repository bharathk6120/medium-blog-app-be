const { DataTypes } = require("sequelize");
const sequelize = require("./db.connection");

const Contents = sequelize.define(
  "contents",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blog_id: { type: DataTypes.INTEGER, allowNull: false },
    type: DataTypes.STRING,
    content: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Contents;
