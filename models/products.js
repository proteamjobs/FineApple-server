module.exports = function(sequelize, DataTypes) {
  const products = sequelize.define("products", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    model_code: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    model_info: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  products.associate = function(models) {
    models.heartedItems.belongsTo(models.products, {
      foreignKey: "product_id"
    });
    models.products.hasMany(models.heartedItems, {
      foreignKey: "product_id"
    });
  };
  return products;
};
