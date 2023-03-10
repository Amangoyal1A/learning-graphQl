const gql = require('graphql-tag');
// Define the GraphQL schema using the gql function
const typeDefs = gql`
  type Query {
    users: [User]
    user(id:ID!):User
    quotes: [Quote]
    iquote(by:ID!):Quote
  }

  type User {
    id: ID!
    email: String
    fname: String
    quotes: [Quote]
    password:String
    lname:String
  }

  type Quote {
    quote: String
    by: ID
  }

  input UserInput{
    fname:String
    lname:String
     email:String
     password:String
  }

  type Mutation{
  signupUserDummy(userInfo:UserInput):User 
  }




`;
/* ! is for mandatory */
//export 
module.exports = typeDefs