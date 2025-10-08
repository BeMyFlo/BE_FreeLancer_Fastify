import bcrypt from "bcrypt";
import db from "../../models/index.js";

const { User } = db;

const userController = {
  async createUser(request, reply) {
    const { email, password } = request.body;

    try {
      const existing = await User.findOne({ where: { email } });
      if (existing) {
        return reply.code(400).send({ error: "Tài khoản đã tồn tại" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        password: hashedPassword,
        role: User.ROLE_USER,
      });

      return reply.code(201).send({ id: user.id, email: user.email });
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Đã xảy ra lỗi" });
    }
  },
};

export default userController;
