'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('product', {
      name:DataTypes.STRING,
      description:DataTypes.STRING,
      inStock:DataTypes.INTEGER,
      status:DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Product;
};