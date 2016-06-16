var express = require("express");
var GraphHTTP = require('express-graphql');
var Schema = require('./schema.js');

const APP_PORT = 3000;

const app = express();

app.use('/graphql', GraphHTTP({
  schema:Schema,
  pretty:true,
  graphiql: true
}))

app.listen(APP_PORT, function(){
  console.log('app listening on port ' +APP_PORT );
  var x= Date.now()
  var date=new Date();
  date.setTime(x);
  dateString = date.toUTCString();
  console.log(dateString);
});