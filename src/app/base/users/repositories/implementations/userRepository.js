import { PrismaClient } from "@prisma/client";
import IRepository from "../interfaces/iUserRepository.js";

class UserRepository extends IRepository{
  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async getAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getById(id) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }

  async create(data) {
    const user = await this.prisma.user.create({ data });
    return user;
  }

  async update(data) {
    const user = await this.prisma.user.update({ where: { id: data.id }, data });
    return user;
  }

  async delete(id) {
    const user = await this.prisma.user.delete({ where: { id } });
    return user;
  }
}

export default new UserRepository();