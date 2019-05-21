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
    store_map_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    store_address3: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    store_address2: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    store_contact: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    get_image_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    way_to_come: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    store_timings: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    store_days: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    store_latitude: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    store_longitude: {
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

// console.log("-----------------------------");
// console.log(store_map_name);
// console.log(store_address3);
// console.log(store_address2);
// console.log(store_contact);
// console.log(getImageURL);
// console.log(way_to_come);
// console.log(store_timings);
// console.log(store_days);
// console.log(store_latitude);
// console.log(store_longitude);
// console.log("-------------------");
// console.log(storeCode);
// console.log(country);
// console.log(storeName);
// console.log("-----------------------------");
