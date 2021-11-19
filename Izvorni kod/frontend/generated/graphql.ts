import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateUserInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type DeleteUserInput = {
  id: Scalars["Int"];
};

export type Earthquake = {
  __typename?: "Earthquake";
  createdAt: Scalars["Float"];
  date: Scalars["Float"];
  epicenterLat: Scalars["Float"];
  epicenterLng: Scalars["Float"];
  id: Scalars["Int"];
  name: Scalars["String"];
  strength: Scalars["Float"];
  surveys: Array<Survey>;
  updatedAt: Scalars["Float"];
};

export type FilterSurveys = {
  merged?: InputMaybe<Scalars["Boolean"]>;
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  createdAt: Scalars["Float"];
  email: Scalars["String"];
  id: Scalars["Int"];
  role: UserRole;
  token: Scalars["String"];
  updatedAt: Scalars["Float"];
};

export type Mutation = {
  __typename?: "Mutation";
  createUser: User;
  deleteUser: Scalars["Boolean"];
  login: LoginResponse;
  submitSurvey: Survey;
  updateUser: User;
};

export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export type MutationDeleteUserArgs = {
  data: DeleteUserInput;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationSubmitSurveyArgs = {
  data: SurveyCreateInput;
};

export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Query = {
  __typename?: "Query";
  earthquakes: Array<Earthquake>;
  me?: Maybe<User>;
  surveys: Array<Survey>;
  users: Array<User>;
};

export type QuerySurveysArgs = {
  filter: FilterSurveys;
};

export type Survey = {
  __typename?: "Survey";
  createdAt: Scalars["Float"];
  earthquake?: Maybe<Earthquake>;
  id: Scalars["Int"];
  lat: Scalars["Float"];
  lng: Scalars["Float"];
  updatedAt: Scalars["Float"];
};

export type SurveyCreateInput = {
  lat?: InputMaybe<Scalars["Float"]>;
  lng?: InputMaybe<Scalars["Float"]>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  role?: InputMaybe<UserRole>;
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["Float"];
  email: Scalars["String"];
  id: Scalars["Int"];
  role: UserRole;
  updatedAt: Scalars["Float"];
};

/** Role of the user */
export enum UserRole {
  Admin = "ADMIN",
  Seismologists = "SEISMOLOGISTS",
}

export type EarthquakesQueryVariables = Exact<{ [key: string]: never }>;

export type EarthquakesQuery = {
  __typename?: "Query";
  earthquakes: Array<{
    __typename?: "Earthquake";
    id: number;
    name: string;
    date: number;
    surveys: Array<{ __typename?: "Survey"; id: number }>;
  }>;
};

export type SurveysQueryVariables = Exact<{
  merged?: Maybe<Scalars["Boolean"]>;
}>;

export type SurveysQuery = {
  __typename?: "Query";
  surveys: Array<{
    __typename?: "Survey";
    id: number;
    lat: number;
    lng: number;
    createdAt: number;
  }>;
};

export type CreateUserMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser: {
    __typename?: "User";
    id: number;
    email: string;
    role: UserRole;
  };
};

export type DeleteUserMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteUserMutation = {
  __typename?: "Mutation";
  deleteUser: boolean;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
  __typename?: "Query";
  users: Array<{
    __typename?: "User";
    id: number;
    email: string;
    role: UserRole;
  }>;
};

export type UpdateUserMutationVariables = Exact<{
  id: Scalars["Int"];
  email?: Maybe<Scalars["String"]>;
  role?: Maybe<UserRole>;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser: {
    __typename?: "User";
    id: number;
    email: string;
    role: UserRole;
  };
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginResponse";
    id: number;
    email: string;
    token: string;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?:
    | { __typename?: "User"; id: number; email: string; role: UserRole }
    | null
    | undefined;
};

export type SubmitSurveyMutationVariables = Exact<{ [key: string]: never }>;

export type SubmitSurveyMutation = {
  __typename?: "Mutation";
  submitSurvey: { __typename?: "Survey"; id: number; lat: number; lng: number };
};

export const EarthquakesDocument = gql`
  query EARTHQUAKES {
    earthquakes {
      id
      name
      date
      surveys {
        id
      }
    }
  }
`;

/**
 * __useEarthquakesQuery__
 *
 * To run a query within a React component, call `useEarthquakesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEarthquakesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEarthquakesQuery({
 *   variables: {
 *   },
 * });
 */
export function useEarthquakesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    EarthquakesQuery,
    EarthquakesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EarthquakesQuery, EarthquakesQueryVariables>(
    EarthquakesDocument,
    options
  );
}
export function useEarthquakesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EarthquakesQuery,
    EarthquakesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EarthquakesQuery, EarthquakesQueryVariables>(
    EarthquakesDocument,
    options
  );
}
export type EarthquakesQueryHookResult = ReturnType<typeof useEarthquakesQuery>;
export type EarthquakesLazyQueryHookResult = ReturnType<
  typeof useEarthquakesLazyQuery
>;
export type EarthquakesQueryResult = Apollo.QueryResult<
  EarthquakesQuery,
  EarthquakesQueryVariables
>;
export const SurveysDocument = gql`
  query SURVEYS($merged: Boolean) {
    surveys(filter: { merged: $merged }) {
      id
      lat
      lng
      createdAt
    }
  }
`;

/**
 * __useSurveysQuery__
 *
 * To run a query within a React component, call `useSurveysQuery` and pass it any options that fit your needs.
 * When your component renders, `useSurveysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSurveysQuery({
 *   variables: {
 *      merged: // value for 'merged'
 *   },
 * });
 */
export function useSurveysQuery(
  baseOptions?: Apollo.QueryHookOptions<SurveysQuery, SurveysQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SurveysQuery, SurveysQueryVariables>(
    SurveysDocument,
    options
  );
}
export function useSurveysLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SurveysQuery, SurveysQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SurveysQuery, SurveysQueryVariables>(
    SurveysDocument,
    options
  );
}
export type SurveysQueryHookResult = ReturnType<typeof useSurveysQuery>;
export type SurveysLazyQueryHookResult = ReturnType<typeof useSurveysLazyQuery>;
export type SurveysQueryResult = Apollo.QueryResult<
  SurveysQuery,
  SurveysQueryVariables
>;
export const CreateUserDocument = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(data: { email: $email, password: $password }) {
      id
      email
      role
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const DeleteUserDocument = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(data: { id: $id })
  }
`;
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    options
  );
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult =
  Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
export const UsersDocument = gql`
  query USERS {
    users {
      id
      email
      role
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser($id: Int!, $email: String, $role: UserRole) {
    updateUser(data: { id: $id, email: $email, role: $role }) {
      id
      email
      role
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      id
      email
      token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const MeDocument = gql`
  query ME {
    me {
      id
      email
      role
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SubmitSurveyDocument = gql`
  mutation submitSurvey {
    submitSurvey(data: { lat: 0, lng: 0 }) {
      id
      lat
      lng
    }
  }
`;
export type SubmitSurveyMutationFn = Apollo.MutationFunction<
  SubmitSurveyMutation,
  SubmitSurveyMutationVariables
>;

/**
 * __useSubmitSurveyMutation__
 *
 * To run a mutation, you first call `useSubmitSurveyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitSurveyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitSurveyMutation, { data, loading, error }] = useSubmitSurveyMutation({
 *   variables: {
 *   },
 * });
 */
export function useSubmitSurveyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubmitSurveyMutation,
    SubmitSurveyMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SubmitSurveyMutation,
    SubmitSurveyMutationVariables
  >(SubmitSurveyDocument, options);
}
export type SubmitSurveyMutationHookResult = ReturnType<
  typeof useSubmitSurveyMutation
>;
export type SubmitSurveyMutationResult =
  Apollo.MutationResult<SubmitSurveyMutation>;
export type SubmitSurveyMutationOptions = Apollo.BaseMutationOptions<
  SubmitSurveyMutation,
  SubmitSurveyMutationVariables
>;

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
