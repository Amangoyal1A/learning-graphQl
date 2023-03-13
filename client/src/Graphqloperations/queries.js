import { gql } from "@apollo/client";
export const GET_ALL_QUOTES = gql`
  query getAllQuotes {
    quotes {
      quote
    }
  }
`;
