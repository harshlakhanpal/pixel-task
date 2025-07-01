import express from 'express';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { connectDB } from './db';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import seedDb from './dbSeed';
dotenv.config();

const startServer = async () => {
  const port = process.env.PORT || 4000;

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );

  if (!process.env.MONGO_URI) {
    throw new Error('db url not defined');
  }
  await connectDB(process.env.MONGO_URI);
  seedDb();

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`server started`);
};

startServer();
