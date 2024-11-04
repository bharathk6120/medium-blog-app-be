const { DataTypes } = require("sequelize");
const sequelize = require("./db.connection");

const Blogs = sequelize.define(
  "blogs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    title: DataTypes.STRING,
    is_published: { type: DataTypes.BOOLEAN, defaultValue: false },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Blogs.sync();

module.exports = Blogs;