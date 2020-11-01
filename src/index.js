import { ApolloServer } from 'apollo-server';
import 'dotenv/config';
import mongoose from 'mongoose';
import config from '../config';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/types';

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
