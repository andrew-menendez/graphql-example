"use strict";

var graphQL = require('graphql');
var ObjectType = graphQL.GraphQLObjectType;
var db = require('./models/');

// now overlay graphQL

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
      },
      posts: {
        type: new graphQL.GraphQLList(Post), // use this whenever you need an array returned...
        resolve(person){
          return person.getPosts() // this connection was made in Sequelize; Very similar to populate in Mongoose
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
      },
      person: {
        type: Person,
        resolve(post){
          return post.getPerson();
        }
      }
    };// end of return
  }
});

// the root query:
// like public api methods

// this whole thing is kindave a replacement for the routes?

// console.log(db);
// // debugger;
// db.post.findOne()
// .then(function(post){
//   return post.getPerson()
//           .then(function(res){
//             console.log(res)
//             debugger;
//           })

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
        },
        posts:{
          type: new graphQL.GraphQLList(Post),
          resolve(root,args){ // associate the root query to the db.
            console.log('args is ',args);
            return db.post.findAll({where:args})
          }
        }
      }
    }
});

var Mutation = new ObjectType({
  name: 'Mutation',
  description: 'this is like a POST',
  fields: function(){
    return {
      addPerson: {
        type: Person,
        args: {
          firstName: {
            type: new graphQL.GraphQLNonNull(graphQL.GraphQLString)
          },
          lastName: {
            type: new graphQL.GraphQLNonNull(graphQL.GraphQLString)
          },
          email: {
            type: new graphQL.GraphQLNonNull(graphQL.GraphQLString)
          }
        },
        resolve(_, args){
          return db.person.create({
            firstName:args.firstName,
            lastName:args.lastName,
            email:args.email.toLowerCase()
          })
        }
      }
    }
  }
})


var Schema = new graphQL.GraphQLSchema({
  query: Query,
  mutation: Mutation
});

// module.exports= Schema;

module.exports= Schema;

