const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { users, quotes } = require('./fakedb');

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
  }

  type Quote {
    quote: String
    by: ID
  }
`;

// Define the resolvers for the schema
const resolvers = {
  Query: {
    //get all user
    users: () => users,
 //get all quotes
    quotes: () => quotes,
    //if you want pass query as a argument
    user:(parent,argument)=>users.find((user)=>user.id==argument.id)
    //get one quote by one id
    ,iquote:(parent,argument)=>quotes.find((quote)=>quote.by==argument.by)
  },
  User: {
    //get quotes in user 
    quotes: (parentUser) => quotes.filter((quote) => quote.by === parentUser.id),
  },
};

// Create the ApolloServer instance with the schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

// Start the server and log the URL it's running on
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
