import 'dotenv/config';
import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';
import config from '../config';

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => 'Hello bro',
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
