const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const typeDefs = require('./Schema')
const resolvers = require('./resolvers')



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
