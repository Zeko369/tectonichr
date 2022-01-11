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

export type City = {
  __typename?: "City";
  country_code: Scalars["String"];
  country_id: Scalars["Int"];
  country_name: Scalars["String"];
  id: Scalars["Int"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  name: Scalars["String"];
  state_code: Scalars["String"];
  state_id: Scalars["Int"];
  state_name: Scalars["String"];
  wikiDataId: Scalars["String"];
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
  archivedAt?: Maybe<Scalars["Float"]>;
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

export type EarthquakeCreateInput = {
  name: Scalars["String"];
  surveyIds: Array<Scalars["Int"]>;
};

export type EarthquakeUpdateInput = {
  addSurveyIds?: InputMaybe<Array<Scalars["Int"]>>;
  name?: InputMaybe<Scalars["String"]>;
  removeSurveyIds?: InputMaybe<Array<Scalars["Int"]>>;
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
  archiveEarthquake: Earthquake;
  createUser: User;
  deleteEarthquake: Scalars["Boolean"];
  deleteSurvey: Scalars["Boolean"];
  deleteUser: Scalars["Boolean"];
  login: LoginResponse;
  mergeSurveys: Earthquake;
  submitSurvey: Survey;
  updateEarthquake: Earthquake;
  updateUser: User;
};

export type MutationArchiveEarthquakeArgs = {
  id: Scalars["Int"];
};

export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export type MutationDeleteEarthquakeArgs = {
  id: Scalars["Int"];
  removeSurveys?: InputMaybe<Scalars["Boolean"]>;
};

export type MutationDeleteSurveyArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteUserArgs = {
  data: DeleteUserInput;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationMergeSurveysArgs = {
  data: EarthquakeCreateInput;
};

export type MutationSubmitSurveyArgs = {
  data: SurveyCreateInput;
};

export type MutationUpdateEarthquakeArgs = {
  data: EarthquakeUpdateInput;
  id: Scalars["Int"];
};

export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Query = {
  __typename?: "Query";
  cities: Array<City>;
  earthquakes: Array<Earthquake>;
  exportEarthquake: Scalars["String"];
  exportEarthquakes: Scalars["String"];
  exportQuestions: Scalars["String"];
  me?: Maybe<User>;
  questions: Array<SurveyQuestion>;
  surveys: Array<Survey>;
  users: Array<User>;
};

export type QueryCitiesArgs = {
  filter: Scalars["String"];
};

export type QueryExportEarthquakeArgs = {
  full?: InputMaybe<Scalars["Boolean"]>;
  id: Scalars["Int"];
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
  responses: Array<SurveyResponse>;
  updatedAt: Scalars["Float"];
};

export type SurveyCreateInput = {
  lat?: InputMaybe<Scalars["Float"]>;
  lng?: InputMaybe<Scalars["Float"]>;
  responses: Array<SurveyQuestionResponse>;
};

export type SurveyOption = {
  __typename?: "SurveyOption";
  id: Scalars["String"];
  intensity: Scalars["String"];
  text: Scalars["String"];
};

export type SurveyQuestion = {
  __typename?: "SurveyQuestion";
  id: Scalars["String"];
  options: Array<SurveyOption>;
  text: Scalars["String"];
};

export type SurveyQuestionResponse = {
  optionId: Scalars["String"];
  questionId: Scalars["String"];
};

export type SurveyResponse = {
  __typename?: "SurveyResponse";
  createdAt: Scalars["Float"];
  id: Scalars["Int"];
  intensity: Scalars["String"];
  option: Scalars["String"];
  optionId: Scalars["String"];
  optionLetter?: Maybe<Scalars["String"]>;
  question: Scalars["String"];
  questionId: Scalars["String"];
  survey: Survey;
  updatedAt: Scalars["Float"];
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

export type ArchiveEarthquakeMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type ArchiveEarthquakeMutation = {
  __typename?: "Mutation";
  archiveEarthquake: {
    __typename?: "Earthquake";
    id: number;
    archivedAt?: number | null | undefined;
  };
};

export type DeleteEarthquakeMutationVariables = Exact<{
  id: Scalars["Int"];
  removeSurveys?: Maybe<Scalars["Boolean"]>;
}>;

export type DeleteEarthquakeMutation = {
  __typename?: "Mutation";
  deleteEarthquake: boolean;
};

export type DeleteSurveyMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteSurveyMutation = {
  __typename?: "Mutation";
  deleteSurvey: boolean;
};

export type EarthquakesQueryVariables = Exact<{ [key: string]: never }>;

export type EarthquakesQuery = {
  __typename?: "Query";
  earthquakes: Array<{
    __typename?: "Earthquake";
    id: number;
    name: string;
    date: number;
    archivedAt?: number | null | undefined;
    surveys: Array<{ __typename?: "Survey"; id: number }>;
  }>;
};

export type MergeSurveysMutationVariables = Exact<{
  surveyIds: Array<Scalars["Int"]> | Scalars["Int"];
  name: Scalars["String"];
}>;

export type MergeSurveysMutation = {
  __typename?: "Mutation";
  mergeSurveys: { __typename?: "Earthquake"; id: number; name: string };
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
    responses: Array<{
      __typename?: "SurveyResponse";
      question: string;
      option: string;
      optionLetter?: string | null | undefined;
      intensity: string;
    }>;
  }>;
};

export type UpdateEarthquakeMutationVariables = Exact<{
  id: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
  add?: Maybe<Array<Scalars["Int"]> | Scalars["Int"]>;
  remove?: Maybe<Array<Scalars["Int"]> | Scalars["Int"]>;
}>;

export type UpdateEarthquakeMutation = {
  __typename?: "Mutation";
  updateEarthquake: {
    __typename?: "Earthquake";
    id: number;
    name: string;
    surveys: Array<{ __typename?: "Survey"; id: number }>;
  };
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

export type ExportEarthquakeQueryVariables = Exact<{
  id: Scalars["Int"];
  full?: Maybe<Scalars["Boolean"]>;
}>;

export type ExportEarthquakeQuery = {
  __typename?: "Query";
  exportEarthquake: string;
};

export type ExportEarthquakesQueryVariables = Exact<{ [key: string]: never }>;

export type ExportEarthquakesQuery = {
  __typename?: "Query";
  exportEarthquakes: string;
};

export type ExportQuestionsQueryVariables = Exact<{ [key: string]: never }>;

export type ExportQuestionsQuery = {
  __typename?: "Query";
  exportQuestions: string;
};

export type CitiesQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type CitiesQuery = {
  __typename?: "Query";
  cities: Array<{
    __typename?: "City";
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    state_name: string;
  }>;
};

export type QuestionsQueryVariables = Exact<{ [key: string]: never }>;

export type QuestionsQuery = {
  __typename?: "Query";
  questions: Array<{
    __typename?: "SurveyQuestion";
    id: string;
    text: string;
    options: Array<{
      __typename?: "SurveyOption";
      id: string;
      text: string;
      intensity: string;
    }>;
  }>;
};

export type SubmitSurveyMutationVariables = Exact<{
  data: SurveyCreateInput;
}>;

export type SubmitSurveyMutation = {
  __typename?: "Mutation";
  submitSurvey: { __typename?: "Survey"; id: number; lat: number; lng: number };
};

export const ArchiveEarthquakeDocument = gql`
  mutation archiveEarthquake($id: Int!) {
    archiveEarthquake(id: $id) {
      id
      archivedAt
    }
  }
`;
export type ArchiveEarthquakeMutationFn = Apollo.MutationFunction<
  ArchiveEarthquakeMutation,
  ArchiveEarthquakeMutationVariables
>;

/**
 * __useArchiveEarthquakeMutation__
 *
 * To run a mutation, you first call `useArchiveEarthquakeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveEarthquakeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveEarthquakeMutation, { data, loading, error }] = useArchiveEarthquakeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveEarthquakeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ArchiveEarthquakeMutation,
    ArchiveEarthquakeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ArchiveEarthquakeMutation,
    ArchiveEarthquakeMutationVariables
  >(ArchiveEarthquakeDocument, options);
}
export type ArchiveEarthquakeMutationHookResult = ReturnType<
  typeof useArchiveEarthquakeMutation
>;
export type ArchiveEarthquakeMutationResult =
  Apollo.MutationResult<ArchiveEarthquakeMutation>;
export type ArchiveEarthquakeMutationOptions = Apollo.BaseMutationOptions<
  ArchiveEarthquakeMutation,
  ArchiveEarthquakeMutationVariables
>;
export const DeleteEarthquakeDocument = gql`
  mutation deleteEarthquake($id: Int!, $removeSurveys: Boolean) {
    deleteEarthquake(id: $id, removeSurveys: $removeSurveys)
  }
`;
export type DeleteEarthquakeMutationFn = Apollo.MutationFunction<
  DeleteEarthquakeMutation,
  DeleteEarthquakeMutationVariables
>;

/**
 * __useDeleteEarthquakeMutation__
 *
 * To run a mutation, you first call `useDeleteEarthquakeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEarthquakeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEarthquakeMutation, { data, loading, error }] = useDeleteEarthquakeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      removeSurveys: // value for 'removeSurveys'
 *   },
 * });
 */
export function useDeleteEarthquakeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteEarthquakeMutation,
    DeleteEarthquakeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteEarthquakeMutation,
    DeleteEarthquakeMutationVariables
  >(DeleteEarthquakeDocument, options);
}
export type DeleteEarthquakeMutationHookResult = ReturnType<
  typeof useDeleteEarthquakeMutation
>;
export type DeleteEarthquakeMutationResult =
  Apollo.MutationResult<DeleteEarthquakeMutation>;
export type DeleteEarthquakeMutationOptions = Apollo.BaseMutationOptions<
  DeleteEarthquakeMutation,
  DeleteEarthquakeMutationVariables
>;
export const DeleteSurveyDocument = gql`
  mutation deleteSurvey($id: Int!) {
    deleteSurvey(id: $id)
  }
`;
export type DeleteSurveyMutationFn = Apollo.MutationFunction<
  DeleteSurveyMutation,
  DeleteSurveyMutationVariables
>;

/**
 * __useDeleteSurveyMutation__
 *
 * To run a mutation, you first call `useDeleteSurveyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSurveyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSurveyMutation, { data, loading, error }] = useDeleteSurveyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSurveyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteSurveyMutation,
    DeleteSurveyMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteSurveyMutation,
    DeleteSurveyMutationVariables
  >(DeleteSurveyDocument, options);
}
export type DeleteSurveyMutationHookResult = ReturnType<
  typeof useDeleteSurveyMutation
>;
export type DeleteSurveyMutationResult =
  Apollo.MutationResult<DeleteSurveyMutation>;
export type DeleteSurveyMutationOptions = Apollo.BaseMutationOptions<
  DeleteSurveyMutation,
  DeleteSurveyMutationVariables
>;
export const EarthquakesDocument = gql`
  query EARTHQUAKES {
    earthquakes {
      id
      name
      date
      archivedAt
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
export const MergeSurveysDocument = gql`
  mutation mergeSurveys($surveyIds: [Int!]!, $name: String!) {
    mergeSurveys(data: { surveyIds: $surveyIds, name: $name }) {
      id
      name
    }
  }
`;
export type MergeSurveysMutationFn = Apollo.MutationFunction<
  MergeSurveysMutation,
  MergeSurveysMutationVariables
>;

/**
 * __useMergeSurveysMutation__
 *
 * To run a mutation, you first call `useMergeSurveysMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMergeSurveysMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mergeSurveysMutation, { data, loading, error }] = useMergeSurveysMutation({
 *   variables: {
 *      surveyIds: // value for 'surveyIds'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useMergeSurveysMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MergeSurveysMutation,
    MergeSurveysMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    MergeSurveysMutation,
    MergeSurveysMutationVariables
  >(MergeSurveysDocument, options);
}
export type MergeSurveysMutationHookResult = ReturnType<
  typeof useMergeSurveysMutation
>;
export type MergeSurveysMutationResult =
  Apollo.MutationResult<MergeSurveysMutation>;
export type MergeSurveysMutationOptions = Apollo.BaseMutationOptions<
  MergeSurveysMutation,
  MergeSurveysMutationVariables
>;
export const SurveysDocument = gql`
  query SURVEYS($merged: Boolean) {
    surveys(filter: { merged: $merged }) {
      id
      lat
      lng
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
export const UpdateEarthquakeDocument = gql`
  mutation updateEarthquake(
    $id: Int!
    $name: String
    $add: [Int!]
    $remove: [Int!]
  ) {
    updateEarthquake(
      id: $id
      data: { name: $name, addSurveyIds: $add, removeSurveyIds: $remove }
    ) {
      id
      name
      surveys {
        id
      }
    }
  }
`;
export type UpdateEarthquakeMutationFn = Apollo.MutationFunction<
  UpdateEarthquakeMutation,
  UpdateEarthquakeMutationVariables
>;

/**
 * __useUpdateEarthquakeMutation__
 *
 * To run a mutation, you first call `useUpdateEarthquakeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEarthquakeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEarthquakeMutation, { data, loading, error }] = useUpdateEarthquakeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      add: // value for 'add'
 *      remove: // value for 'remove'
 *   },
 * });
 */
export function useUpdateEarthquakeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateEarthquakeMutation,
    UpdateEarthquakeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateEarthquakeMutation,
    UpdateEarthquakeMutationVariables
  >(UpdateEarthquakeDocument, options);
}
export type UpdateEarthquakeMutationHookResult = ReturnType<
  typeof useUpdateEarthquakeMutation
>;
export type UpdateEarthquakeMutationResult =
  Apollo.MutationResult<UpdateEarthquakeMutation>;
export type UpdateEarthquakeMutationOptions = Apollo.BaseMutationOptions<
  UpdateEarthquakeMutation,
  UpdateEarthquakeMutationVariables
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
export const ExportEarthquakeDocument = gql`
  query exportEarthquake($id: Int!, $full: Boolean) {
    exportEarthquake(id: $id, full: $full)
  }
`;

/**
 * __useExportEarthquakeQuery__
 *
 * To run a query within a React component, call `useExportEarthquakeQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportEarthquakeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportEarthquakeQuery({
 *   variables: {
 *      id: // value for 'id'
 *      full: // value for 'full'
 *   },
 * });
 */
export function useExportEarthquakeQuery(
  baseOptions: Apollo.QueryHookOptions<
    ExportEarthquakeQuery,
    ExportEarthquakeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ExportEarthquakeQuery, ExportEarthquakeQueryVariables>(
    ExportEarthquakeDocument,
    options
  );
}
export function useExportEarthquakeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ExportEarthquakeQuery,
    ExportEarthquakeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ExportEarthquakeQuery,
    ExportEarthquakeQueryVariables
  >(ExportEarthquakeDocument, options);
}
export type ExportEarthquakeQueryHookResult = ReturnType<
  typeof useExportEarthquakeQuery
>;
export type ExportEarthquakeLazyQueryHookResult = ReturnType<
  typeof useExportEarthquakeLazyQuery
>;
export type ExportEarthquakeQueryResult = Apollo.QueryResult<
  ExportEarthquakeQuery,
  ExportEarthquakeQueryVariables
>;
export const ExportEarthquakesDocument = gql`
  query exportEarthquakes {
    exportEarthquakes
  }
`;

/**
 * __useExportEarthquakesQuery__
 *
 * To run a query within a React component, call `useExportEarthquakesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportEarthquakesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportEarthquakesQuery({
 *   variables: {
 *   },
 * });
 */
export function useExportEarthquakesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ExportEarthquakesQuery,
    ExportEarthquakesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ExportEarthquakesQuery,
    ExportEarthquakesQueryVariables
  >(ExportEarthquakesDocument, options);
}
export function useExportEarthquakesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ExportEarthquakesQuery,
    ExportEarthquakesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ExportEarthquakesQuery,
    ExportEarthquakesQueryVariables
  >(ExportEarthquakesDocument, options);
}
export type ExportEarthquakesQueryHookResult = ReturnType<
  typeof useExportEarthquakesQuery
>;
export type ExportEarthquakesLazyQueryHookResult = ReturnType<
  typeof useExportEarthquakesLazyQuery
>;
export type ExportEarthquakesQueryResult = Apollo.QueryResult<
  ExportEarthquakesQuery,
  ExportEarthquakesQueryVariables
>;
export const ExportQuestionsDocument = gql`
  query exportQuestions {
    exportQuestions
  }
`;

/**
 * __useExportQuestionsQuery__
 *
 * To run a query within a React component, call `useExportQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportQuestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useExportQuestionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ExportQuestionsQuery,
    ExportQuestionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ExportQuestionsQuery, ExportQuestionsQueryVariables>(
    ExportQuestionsDocument,
    options
  );
}
export function useExportQuestionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ExportQuestionsQuery,
    ExportQuestionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ExportQuestionsQuery,
    ExportQuestionsQueryVariables
  >(ExportQuestionsDocument, options);
}
export type ExportQuestionsQueryHookResult = ReturnType<
  typeof useExportQuestionsQuery
>;
export type ExportQuestionsLazyQueryHookResult = ReturnType<
  typeof useExportQuestionsLazyQuery
>;
export type ExportQuestionsQueryResult = Apollo.QueryResult<
  ExportQuestionsQuery,
  ExportQuestionsQueryVariables
>;
export const CitiesDocument = gql`
  query cities($name: String!) {
    cities(filter: $name) {
      id
      name
      latitude
      longitude
      state_name
    }
  }
`;

/**
 * __useCitiesQuery__
 *
 * To run a query within a React component, call `useCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCitiesQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCitiesQuery(
  baseOptions: Apollo.QueryHookOptions<CitiesQuery, CitiesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CitiesQuery, CitiesQueryVariables>(
    CitiesDocument,
    options
  );
}
export function useCitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CitiesQuery, CitiesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CitiesQuery, CitiesQueryVariables>(
    CitiesDocument,
    options
  );
}
export type CitiesQueryHookResult = ReturnType<typeof useCitiesQuery>;
export type CitiesLazyQueryHookResult = ReturnType<typeof useCitiesLazyQuery>;
export type CitiesQueryResult = Apollo.QueryResult<
  CitiesQuery,
  CitiesQueryVariables
>;
export const QuestionsDocument = gql`
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

/**
 * __useQuestionsQuery__
 *
 * To run a query within a React component, call `useQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuestionsQuery(
  baseOptions?: Apollo.QueryHookOptions<QuestionsQuery, QuestionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<QuestionsQuery, QuestionsQueryVariables>(
    QuestionsDocument,
    options
  );
}
export function useQuestionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    QuestionsQuery,
    QuestionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<QuestionsQuery, QuestionsQueryVariables>(
    QuestionsDocument,
    options
  );
}
export type QuestionsQueryHookResult = ReturnType<typeof useQuestionsQuery>;
export type QuestionsLazyQueryHookResult = ReturnType<
  typeof useQuestionsLazyQuery
>;
export type QuestionsQueryResult = Apollo.QueryResult<
  QuestionsQuery,
  QuestionsQueryVariables
>;
export const SubmitSurveyDocument = gql`
  mutation submitSurvey($data: SurveyCreateInput!) {
    submitSurvey(data: $data) {
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
 *      data: // value for 'data'
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
