module.exports = function(sequelize, DataTypes) {
  const users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
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
