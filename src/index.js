import 'dotenv/config';
import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';
import config from '../config';
import Post from './models/Post';

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
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

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongo DB connected successfully!');
    return server.listen({ port: 5000 });
  })
  .then((result) => console.log(`Server running at: ${result.url}`));
