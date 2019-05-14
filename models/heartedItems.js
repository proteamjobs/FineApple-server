/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  const heartedItems = sequelize.define("heartedItems", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
  });
  return heartedItems;
};
