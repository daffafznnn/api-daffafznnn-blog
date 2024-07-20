import { PrismaClient } from "@prisma/client";

class BaseRepository {
  constructor(modelName) {
    this.prisma = new PrismaClient();
    this.model = this.prisma[modelName];
  }

  async getAll() {
    try {
      return await this.model.findMany();
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async getById(id) {
    this.validateId(id);
    try {
      return await this.model.findUnique({ where: { id } });
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async create(data) {
    try {
      return await this.model.create({ data });
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async update(id, data) {
    this.validateId(id);
    try {
      return await this.model.update({ where: { id }, data });
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async delete(id) {
    this.validateId(id);
    try {
      return await this.model.delete({ where: { id } });
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async count() {
    try {
      return await this.model.count();
    } catch (error) {
      this.handleDatabaseError(error);
    }
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

  handleDatabaseError(error) {
    // Log and handle database errors
    console.error('Database Error:', error);
    throw new Error('Database operation failed');
  }
}

export default BaseRepository;