// backend/src/resolvers.js
// this file contains the resolvers for the GraphQL schema
// resolvers define how to fetch the data for the types and fields defined in the schema
// it includes a query to get all users and a mutation to create a new user
// the getUsers query returns an array of User objects
// the createUser mutation takes arguments for name, email, bio, skills, and interests
// and returns the created User object
const resolvers = {
  Query: {
    getUsers: async (_, __, { prisma }) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    createUser: async (_, args, { prisma }) => {
      return await prisma.user.create({ data: args });
    },
    login: async (_, { username, password }, { prisma }) => {
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        throw new Error('User not found');
      }
      // For demo: compare plaintext passwords (do NOT do this in production)
      if (user.password !== password) {
        throw new Error('Invalid password');
      }
      return user;
    },
  },
};

module.exports = { resolvers };
