export function authorizeRole(roles = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return async function (request, reply) {
    const user = request.user;
    if (!user) {
      return reply.code(401).send({ message: "Unauthorized" });
    }
    if (!roles.includes(user.role)) {
      return reply.code(403).send({ message: "Forbidden: Not enough rights" });
    }
  };
}
