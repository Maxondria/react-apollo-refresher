import postResolvers from './Posts';

const resolvers = {
  Query: {
    ...postResolvers.Query,
  },
};

export default resolvers;
