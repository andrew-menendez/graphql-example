"use strict";

var fs        = require("fs");
var path      = require("path");
var _ = require('lodash');
var faker = require('faker');

var Sequelize = require('sequelize');
var database = 'northwind';
// connect to DB & initialize sequelize
var sql = new Sequelize(database, 'root', null, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

//Checking connection status
sql.authenticate().then(function() {
  console.log('connected to ', database);
}).catch(function() {
  console.log("fuck!");
}).done();


var db = {};

// from sequelize docs: http://docs.sequelizejs.com/en/1.7.0/articles/express/
// strategy for storing models in individual files:
// read current directory
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sql.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

//debugger;

sql.sync({force:true}).then(function(){
  _.times(10,function(){
    return db.person.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email()
    }).then(function(person){
      let createPosts = [];

      _.times(4,function(){
        createPosts.push(person.createPost({
          title:faker.company.bsAdjective()+' Product Review by ' +person.firstName,
          content: ' sample text'
        }))
      })

      return Promise.all(createPosts);

    }).map(function(post){
      return post.createProduct({
        name:faker.commerce.productName(),
        inStock:Math.floor(Math.random() * 100)
      })
    }).then(function(){
      console.log('done?');
    })
  })
})

module.exports = db;