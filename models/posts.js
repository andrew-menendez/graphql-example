'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('post', {
      title:DataTypes.STRING,
      content:DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Post.belongsTo(models.person);
        Post.belongsTo(models.product)
      }
    }
  });
  return Post;
};