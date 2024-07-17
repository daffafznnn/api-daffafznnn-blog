import removeSensitiveFields from '../../../helpers/removeSensitiveFields.js';
import UserRepository from '../repositories/implementations/userRepository.js';

class UserService {
  constructor() {
    this.repository = UserRepository;
  }

  async getAll() {
    const users = await this.repository.getAll();
    const sanitizedUsers = users.map(user => removeSensitiveFields(user));

    return {
      success: true,
      data: sanitizedUsers,
      message: "Successfully retrieved user data"
    };
  }

  async getById(id) {
    const user = await this.repository.getById(id);
    if (!user) {
      throw { statusCode: 404, message: "User not Found" };
    }
    return {
      success: true,
      data: removeSensitiveFields(user),
      message: "Successfully retrieved user data"
    };
  }

  async create(data) {
    const user = await this.repository.create(data);
    return {
      success: true,
      data: removeSensitiveFields(user),
      message: "User created successfully"
    };
  }

  async update(id, data) {
    const user = await this.repository.update(id, data);
    if (!user) {
      throw { statusCode: 404, message: "User not found" };
    }
    return {
      success: true,
      data: removeSensitiveFields(user),
      message: "User updated successfully"
    };
  }

  async delete(id) {
    const user = await this.repository.delete(id);
    if (!user) {
      throw { statusCode: 404, message: "User not found" };
    }
    return {
      success: true,
      data: removeSensitiveFields(user),
      message: "User deleted successfully"
    };
  }
}

export default new UserService();