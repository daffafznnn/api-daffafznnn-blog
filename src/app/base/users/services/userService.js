import removeSensitiveFields from '../../../helpers/removeSensitiveFields.js';
import UserRepository from '../repositories/userRepository.js';
import BaseService from '../../../common/baseService.js';
import { hashPassword } from '../../../helpers/passwordHelper.js';

class UserService extends BaseService {
  constructor() {
    super(UserRepository);
  }

  async getAll(queryParams) {
    const users = await super.getAll(queryParams);
    const sanitizedUsers = users.map(user => removeSensitiveFields(user));
    return {
      success: true,
      data: sanitizedUsers,
      message: "Successfully retrieved user data"
    };
  }

  async getById(id) {
    const user = await super.getById(id);
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
    const hashedPassword = await hashPassword(data.password_hash);
    const userData = { ...data, password_hash: hashedPassword };
    const user = await super.create(userData);
    return {
      success: true,
      data: removeSensitiveFields(user),
      message: "User created successfully"
    };
  }

  async update(id, data) {
  const user = await super.getById(id);
  if (!user) {
    throw { statusCode: 404, message: "User not Found" };
  }

  // Hash the password if provided
  const hashedPassword = data.password_hash ? await hashPassword(data.password_hash) : undefined;

  // Convert is_active to boolean if provided, while handling 0 and 1 correctly
  const isActive = typeof data.is_active !== 'undefined' ? Boolean(Number(data.is_active)) : user.is_active;

  // Prepare user data for update
  const userData = {
    ...data,
    password_hash: hashedPassword, // Use existing password_hash if not provided
    is_active: isActive // Use the evaluated isActive
  };

  // Perform the update
  const userUpdate = await super.update(user.id, userData);

  return {
    success: true,
    data: removeSensitiveFields(userUpdate),
    message: "User updated successfully"
  };
}

  async delete(id) {
    const user = await super.delete(id);
    if (!user) {
      throw { statusCode: 404, message: "User not found" };
    }
    return {
      success: true,
      data: removeSensitiveFields(user),
      message: "User deleted successfully"
    };
  }

  // Add your custom methods here
  async customMethod1(params) {
    // Custom logic for customMethod1
    return {
      success: true,
      data: "Custom method 1 executed",
      message: "Successfully executed customMethod1"
    };
  }

  async customMethod2(params) {
    // Custom logic for customMethod2
    return {
      success: true,
      data: "Custom method 2 executed",
      message: "Successfully executed customMethod2"
    };
  }

  // Add more custom methods as needed
}

export default new UserService();