import Fastify from "fastify";
import dbPlugin from "./plugins/db.js";
import useRoutes from "./routes/index.js";
import multipart from "@fastify/multipart";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import formbody from "@fastify/formbody";
import jwtPlugin from "./middlewares/jwt.js";
import authenticatePlugin from "./middlewares/authenticate.js";
dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(dbPlugin);
fastify.register(useRoutes);
fastify.register(multipart);
fastify.register(cors, { origin: "*" });
fastify.register(helmet);
fastify.register(formbody);
fastify.register(jwtPlugin);
fastify.register(authenticatePlugin);

const start = async () => {
  try {
    await fastify.listen({
      port: process.env.PORT || 3000,
      host: "0.0.0.0",
    });
    fastify.log.info(
      `Server running at http://localhost:${process.env.PORT || 3000}`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
