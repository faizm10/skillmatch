const { gql } = require('apollo-server');

//defining the graphQL schema for the application
//this schema defines the User type and the queries and mutations available for it
//the User type includes fields for id, name, email, bio, skills, interests,
//and createdAt, and the queries allow for fetching all users and creating a new user
//the createUser mutation requires name, email, and skills, while bio and interests are optional
//the schema is used by the Apollo server to handle requests and responses

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    username: String!
    bio: String
    skills: [String!]!
    interests: [String!]!
    password: String
    createdAt: String!
  }

  type Query {
    getUsers: [User!]!
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      username: String!
      bio: String
      skills: [String!]!
      interests: [String!]!
      password: String!
    ): User!
    login(
      username: String!
      password: String!
    ): User!
  }
`;

module.exports = { typeDefs };
