module.exports = function(sequelize, DataTypes) {
  const users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    provider: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  });
  users.associate = function(models) {
    models.users.hasMany(models.heartedItems, {
      foreignKey: "user_id"
    });
    models.heartedItems.belongsTo(models.users, {
      foreignKey: "user_id"
    });
  };
  return users;
};
