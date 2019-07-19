module.exports = function(sequelize, DataTypes) {
  var Drink = sequelize.define("Drink", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Drink;
};
