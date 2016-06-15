"use strict";

var graphQL = require('graphql');
var ObjectType = graphQL.GraphQLObjectType;
var db = require('./models/');

// now overlay graphQL

console.log(ObjectType);

debugger;

var Person = new ObjectType({
  name: 'Person',
  description: 'This represents a person',
  fields: function() {
    return {
      id: {
        type: graphQL.GraphQLInt,
        resolve(person) {
          return person.id;
        }
      },
      firstName: {
        type: graphQL.GraphQLString,
        resolve(person) {
          return person.firstName;
        }
      },
      lastName: {
        type: graphQL.GraphQLString,
        resolve(person) {
          return person.lastName;
        }
      },
      email: {
        type: graphQL.GraphQLString,
        resolve(person) {
          return person.email;
        }
      }
    };
    } // end of return
});


var Post = new ObjectType({
  name: 'Post',
  description: 'this is a post',
  fields: function() {
    return {
      title: {
        type: graphQL.GraphQLString,
        resolve(post) {
          return post.title;
        }
      },
      content: {
        type: graphQL.GraphQLString,
        resolve(post) {
          return post.content;
        }
      }
    };// end of return
  }
});

// the root query:
// like public api methods

// this whole thing is kindave a replacement for the routes?

// console.log(db);
// debugger;
// db.person.findAll({where:{}}).then(function(res){
//   console.log(res);
//   debugger;
// })

var Query = new ObjectType({
    name:'Query',
    description:'This is a root query',
    fields: function(){
      return {
        people:{
          type: new graphQL.GraphQLList(Person),
          args:{ // santize args for security...
            id: {
              type:graphQL.GraphQLInt
            },
            email: {
              type: graphQL.GraphQLString
            }
          },
          resolve(root,args){ // associate the root query to the db.
            console.log('args is ',args);
            return db.person.findAll({where:args})
          }
        }
      }
    }
});


var Schema = new graphQL.GraphQLSchema({
  query: Query
});

// module.exports= Schema;

module.exports= Schema;

