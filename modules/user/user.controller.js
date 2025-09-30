import CryptoJS from "crypto-js";
import db from "../../models/index.js";

const { User } = db;

const userController = {
  /**
   * Tạo user mới (Register)
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async createUser(request, reply) {
    const { email, password } = request.body;

    try {
      const existing = await User.findOne({ where: { email: email } });

      if (existing) {
        return reply.code(400).send({ error: "Tài khoản đã tồn tại" });
      }

      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.KEY_CRYPTO
      ).toString();

      const user = await User.create({
        email: email,
        password: encryptedPassword,
        role: User.ROLE_USER,
      });

      return reply.code(201).send(user);
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: "Đã xảy ra lỗi" });
    }
  },
};

export default userController;
