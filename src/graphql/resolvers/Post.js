import Post from '../../models/Post';

const postResolvers = {
  Query: {
    getPosts: async () => {
      try {
        return await Post.find();
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default postResolvers;
