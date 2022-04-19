import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schemas/index';
import resolvers from './resolvers/index';
import dotenv from 'dotenv';
import connectMongo from './db/db';
import { checkAuth } from './utils/auth';
import helmet from 'helmet';
const port = process.env.PORT || 3000;

dotenv.config();

(async () => {
  try {
    const connection = await connectMongo();
    if (connection) {
      console.log('Db connected successfully');
    } else {
      throw new Error('Db not connected');
    }
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => {
        if (req) {
          const user = await checkAuth(req);
          return { user, req };
        }
      },
    });

    const app = express();

    app.use(
      helmet({
        ieNoOpen: false,
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
      })
    );

    await server.start();

    server.applyMiddleware({ app });

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    if (process.env.NODE_ENV === 'production') {
      (async () =>
        (await import('./utils/production')).default(
          app,
          port,
          server.graphqlPath
        ))();
    } else {
      (async () =>
        (await import('./utils/localhost')).default(
          app,
          port,
          server.graphqlPath
        ))();
    }
  } catch (e) {
    console.log('server error: ' + e.message);
  }
})();
