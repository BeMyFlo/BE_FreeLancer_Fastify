export default async function authenticatePlugin(fastify) {
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ message: "Unauthorized" });
    }
  });
}
