
const { users, quotes } = require('./fakedb');
const randomid = require('crypto')

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
      quotes: (parentUser) => quotes.filter((quote) => quote.by == parentUser.id),
    },

    Mutation: {
        // Create a new user
        signupUserDummy: (parent, {userInfo}) => {
          const id = randomid.randomBytes(5).toString('hex');
          const newUser = {
            id,
            ...userInfo
          };
          users.push(newUser);
      
          // Return the newly created user
          return newUser;
        }
      }
  };
  module.exports= resolvers