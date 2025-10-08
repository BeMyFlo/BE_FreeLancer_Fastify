import userController from "./user.controller.js";
import { authorizeRole } from "../../middlewares/authorize.js";

export default async function userRoutes(fastify, opts) {
  fastify.post("/register", userController.createUser);
}

// fastify.post(
//   "/admin/task",
//   { preHandler: [fastify.authenticate, authorizeRole("admin")] },
//   userController.createTask
// );
