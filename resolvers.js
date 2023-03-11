const { users, quotes } = require("./fakedb");
const random_id = require("crypto");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usermodel = require("./models/user");

// Define the resolvers for the schema
const resolvers = {
  Query: {
    //get all user
    users: () => users,
    //get all quotes
    quotes: () => quotes,
    //if you want pass query as a argument
    user: (parent, argument) => users.find((user) => user._id == argument._id),
    //get one quote by one _id
    iquote: (parent, argument) =>
      quotes.find((quote) => quote.by == argument.by),
  },
  User: {
    //get quotes in user
    quotes: (parentUser) =>
      quotes.filter((quote) => quote.by == parentUser._id),
  },

  // Mutation: {
  //     // Create a new user
  //     signupUserDummy: (parent, {userInfo}) => {
  //       const _id = random_id.randomBytes(5).toString('hex');
  //       const newUser = {
  //         _id,
  //         ...userInfo
  //       };
  //       users.push(newUser);

  //       // Return the newly created user
  //       return newUser;
  //     }
  //   }

  Mutation:{
    signupUser:async (_,{userNew})=>{
      const user = await Usermodel.findOne({email:userNew.email})
      if(user){
          throw new Error("User already exists with that email")
      }
     const hashedPassword =  await bcrypt.hash(userNew.password,12)

    const newUser =  new Usermodel({
         ...userNew,
         password:hashedPassword
     })
    return await newUser.save()
    },
    signinUser:async (_,{userSignin})=>{
     const user = await Usermodel.findOne({email:userSignin.email})
     if(!user){
         throw new Error("User dosent exists with that email")
     }
     const doMatch =await bcrypt.compare(userSignin.password,user.password)
     if(!doMatch){
         throw new Error("email or password in invalid")
     }
     const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
     return {token}
    },
  },
};
module.exports = resolvers;
