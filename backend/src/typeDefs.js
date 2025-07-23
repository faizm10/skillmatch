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
    devpost: String
    github: String
    linkedin: String
    website: String
    password: String
    createdAt: String!
    hackathons: [HackathonParticipant!]
  }

  input UpdateUserInput {
    name: String
    username: String
    bio: String
    skills: [String!]
    interests: [String!]
    devpost: String
    github: String
    linkedin: String
    website: String
  }

  type Hackathon {
    id: ID!
    title: String!
    description: String!
    date: String!
    endDate: String!
    location: String!
    status: String!
    theme: String!
    maxParticipants: Int!
    prizes: [String!]!
    rules: String!
    organizers: [String!]!
    sponsors: [String!]!
    createdAt: String!
    participants: [HackathonParticipant!]
  }

  type HackathonParticipant {
    id: ID!
    userId: Int!
    hackathonId: Int!
    joinedAt: String!
    user: User!
    hackathon: Hackathon!
  }

  type Query {
    getUsers: [User!]!
    getUser(username: String!): User
    getHackathons: [Hackathon!]!
    getHackathon(id: ID!): Hackathon
    getUserHackathons(username: String!): [Hackathon!]!
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
    createHackathon(
      title: String!
      description: String!
      date: String!
      endDate: String!
      location: String!
      status: String!
      theme: String!
      maxParticipants: Int!
      prizes: [String!]!
      rules: String!
      organizers: [String!]!
      sponsors: [String!]!
    ): Hackathon!
    joinHackathon(
      username: String!
      hackathonId: ID!
    ): HackathonParticipant!
    // updateUser(
    //   id: ID!
    //   input: UpdateUserInput!
    // ): User!
  }
`;

module.exports = { typeDefs };
