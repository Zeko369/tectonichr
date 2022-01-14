import { gql } from "@apollo/client";

export const questions = gql`
  query QUESTIONS {
    questions {
      id
      text
      options {
        id
        text
        intensity
      }
    }
  }
`;
