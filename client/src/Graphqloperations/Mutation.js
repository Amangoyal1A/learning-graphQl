import { gql } from "@apollo/client";
export const CREATE_USER=gql`mutation createUser($userNew: UserInput) {
    signupUser(userNew: $userNew) {
      fname
      lname
      email
      password
    }
  }
  `

export const LOGIN_USER=gql`

mutation signinUser($userSignin: UserSigninInput) {
    signinUser(userSignin:$userSignin) {
       token
     }
   }
   

`
