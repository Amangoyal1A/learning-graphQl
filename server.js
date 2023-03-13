const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const typeDefs = require("./Schema");
const resolvers = require("./resolvers");
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected!"));



const  context= ({ req }) => {
  // The context function receives the HTTP request as an argument.
  const { authorization } = req.headers; // Extract the authorization header from the request.
  if (authorization) {
    // If the authorization header is present in the request...
    const { userId } = jwt.verify(authorization, process.env.JWT_SECRET); // Decode the JWT token and extract the user ID.
    return { userId }; // Return the user ID as part of the context object.
  }
}


// Create the ApolloServer instance with the schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

// Start the server and log the URL it's running on
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
