import Fastify from 'fastify';
import dbPlugin from './plugins/db.js';
import useRoutes from './routes/index.js';
import multipart from '@fastify/multipart';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import formbody from '@fastify/formbody';
import jwt from '@fastify/jwt';

const fastify = Fastify({ logger: true });

fastify.register(dbPlugin);
fastify.register(useRoutes);
fastify.register(multipart);
fastify.register(cors, {
  origin: '*',
});
fastify.register(helmet);
dotenv.config();
fastify.register(formbody);
fastify.register(jwt, { secret: 'supersecret' });

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info('Server running at http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
