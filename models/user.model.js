// models/user.model.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
              isEmail: true,
          }
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      role: {
          type: DataTypes.ENUM,
          values: ["administrador", "usuario"],
          allowNull: false,
          defaultValue: "usuario",
      }
  });

  return User;
};
