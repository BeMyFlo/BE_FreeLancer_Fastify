import fastifyJwt from "@fastify/jwt";
import dotenv from "dotenv";
dotenv.config();

export default async function jwtPlugin(fastify) {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
  });
}
