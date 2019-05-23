module.exports = function(sequelize, DataTypes) {
  const productsinstores = sequelize.define("productsinstores", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    is_pickup: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  productsinstores.associate = function(models) {
    models.productsinstores.belongsTo(models.stores, {
      foreignKey: "store_id"
    });
    models.stores.hasMany(models.productsinstores, {
      foreignKey: "store_id"
    });
    models.productsinstores.belongsTo(models.products, {
      foreignKey: "product_id"
    });
    models.products.hasMany(models.productsinstores, {
      foreignKey: "product_id"
    });
  };
  return productsinstores;
};
