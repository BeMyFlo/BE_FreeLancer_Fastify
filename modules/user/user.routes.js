import userController from "./user.controller.js";

export default async function userRoutes(fastify, opts) {
  fastify.post("/register", userController.createUser);
}
