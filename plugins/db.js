import fp from 'fastify-plugin';
import db from '../models/index.js';

async function dbConnector(fastify, options) {
  try {
    await db.sequelize.authenticate();
    fastify.log.info('Database connected successfully');
  } catch (error) {
    fastify.log.error('Database connection error:', error);
    process.exit(1);
  }

  fastify.decorate('db', db);
}

export default fp(dbConnector);