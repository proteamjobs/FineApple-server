module.exports = function(sequelize, DataTypes) {
  const stores = sequelize.define("stores", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    store_code: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    country_code: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    store_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    way_to_come: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  stores.associate = function(models) {
    models.stores.hasMany(models.heartedItems, {
      foreignKey: "store_id"
    });
    models.heartedItems.belongsTo(models.stores, {
      foreignKey: "store_id"
    });
  };
  return stores;
};
