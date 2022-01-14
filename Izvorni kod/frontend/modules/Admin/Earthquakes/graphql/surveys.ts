import { gql } from "@apollo/client";

export const surveys = gql`
  query SURVEYS($merged: Boolean) {
    surveys(filter: { merged: $merged }) {
      id
      lat
      lng
      strength
      city
      responses {
        question
        option
        optionLetter
        intensity
      }
      createdAt
    }
  }
`;
