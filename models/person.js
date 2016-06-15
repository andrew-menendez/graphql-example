'use strict';
module.exports = function(sequelize, DataTypes) {
  var Person = sequelize.define('person', {
      firstName:DataTypes.STRING,
      lastName:DataTypes.STRING,
      email:DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Person.hasMany(models.post);
      }
    }
  });
  return Person;
};


