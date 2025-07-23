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
    getUser: async (_, { username }, { prisma }) => {
      return await prisma.user.findUnique({ 
        where: { username },
        include: {
          hackathons: {
            include: {
              hackathon: true
            }
          }
        }
      });
    },
    getHackathons: async (_, __, { prisma }) => {
      return await prisma.hackathon.findMany({
        include: {
          participants: {
            include: {
              user: true
            }
          }
        }
      });
    },
    getHackathon: async (_, { id }, { prisma }) => {
      return await prisma.hackathon.findUnique({
        where: { id: parseInt(id) },
        include: {
          participants: {
            include: {
              user: true
            }
          }
        }
      });
    },
    getUserHackathons: async (_, { username }, { prisma }) => {
      const user = await prisma.user.findUnique({
        where: { username },
        include: {
          hackathons: {
            include: {
              hackathon: true
            }
          }
        }
      });
      return user ? user.hackathons.map(hp => hp.hackathon) : [];
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
    createHackathon: async (_, args, { prisma }) => {
      return await prisma.hackathon.create({ 
        data: {
          ...args,
          date: new Date(args.date),
          endDate: new Date(args.endDate)
        }
      });
    },
    joinHackathon: async (_, { username, hackathonId }, { prisma }) => {
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        throw new Error('User not found');
      }
      
      // Check if hackathon exists
      const hackathon = await prisma.hackathon.findUnique({
        where: { id: parseInt(hackathonId) }
      });
      if (!hackathon) {
        throw new Error('Hackathon not found');
      }
      
      // Check if user is already a participant
      const existingParticipant = await prisma.hackathonParticipant.findUnique({
        where: {
          userId_hackathonId: {
            userId: user.id,
            hackathonId: parseInt(hackathonId)
          }
        }
      });
      
      if (existingParticipant) {
        throw new Error('User is already a participant in this hackathon');
      }
      
      return await prisma.hackathonParticipant.create({
        data: {
          userId: user.id,
          hackathonId: parseInt(hackathonId)
        },
        include: {
          user: true,
          hackathon: true
        }
      });
    },
    // updateUser: async (_, { id, input }, { prisma }) => {
    //   const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    //   if (!user) {
    //     throw new Error('User not found');
    //   }
      
    //   // Check if username is being changed and if it's already taken
    //   if (input.username && input.username !== user.username) {
    //     const existingUser = await prisma.user.findUnique({ 
    //       where: { username: input.username } 
    //     });
    //     if (existingUser) {
    //       throw new Error('Username already taken');
    //     }
    //   }
      
    //   return await prisma.user.update({
    //     where: { id: parseInt(id) },
    //     data: input
    //   });
    // },
  },
};

module.exports = { resolvers };
