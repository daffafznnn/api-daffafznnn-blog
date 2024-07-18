import { PrismaClient } from "@prisma/client";

class BaseRepository {
  constructor(modelName) {
    this.prisma = new PrismaClient();
    this.model = this.prisma[modelName];
  }

  async getAll() {
    return await this.model.findMany();
  }

  async getById(id) {
    this.validateId(id);
    return await this.model.findUnique({ where: { id } });
  }

  async create(data) {
    this.validateCreateData(data);
    return await this.model.create({ data });
  }

  async update(id, data) {
    this.validateId(id);
    this.validateUpdateData(data);
    return await this.model.update({ where: { id }, data });
  }

  async delete(id) {
    this.validateId(id);
    return await this.model.delete({ where: { id } });
  }

  async count() {
    return await this.model.count();
  }

  getSearchConditions(search) {
    // Override in subclass to define search conditions
    return [];
  }

  validateId(id) {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID');
    }
  }

  validateCreateData(data) {
    throw new Error("Method not implemented.");
  }

  validateUpdateData(data) {
    throw new Error("Method not implemented.");
  }

  handleDatabaseError(error) {
    // Log and handle database errors
    console.error('Database Error:', error);
    throw new Error('Database operation failed');
  }
}

export default BaseRepository;