const gql = require("graphql-tag");
// Define the GraphQL schema using the gql function
const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [Quote]
    iquote(by: ID!): Quote
  }

  type User {
    _id: ID!
    email: String
    fname: String
    quotes: [Quote]
    password: String
    lname: String
  }

  type Quote {
    quote: String
    by: ID
  }

  input UserInput {
    fname: String
    lname: String
    email: String
    password: String
  }
  type Token{
    token:String
}
type Mutation{
    signupUser(userNew:UserInput):User
    signinUser(userSignin:UserSigninInput):Token
}
input UserInput{
   firstName:String
   lastName:String
   email:String
   password:String
}
input UserSigninInput{
   email:String
   password:String
}
`;
/* ! is for mandatory */
//export
module.exports = typeDefs;
