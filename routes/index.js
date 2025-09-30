import userRoutes from "../modules/user/user.routes.js";

const useRoutes = async (fastify, opts) => {
  fastify.register(userRoutes, { prefix: "/api/user" });
};

export default useRoutes;
