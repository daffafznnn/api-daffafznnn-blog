class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getById(id) {
    this.validateId(id);
    return await this.repository.getById(id);
  }

  async create(data) {
    return await this.repository.create(data);
  }

  async update(id, data) {
    this.validateId(id);
    return await this.repository.update(id, data);
  }

  async delete(id) {
    this.validateId(id);
    return await this.repository.delete(id);
  }

  validateId(id) {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID');
    }
  }  
}

export default BaseService;
