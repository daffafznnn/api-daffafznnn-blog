import BaseRepository from "../../../common/baseRepository.js";

class UserRepository extends BaseRepository {
  constructor() {
    super('user'); // Pass the Prisma model name
  }

  getByEmail(email) {
    return this.model.findUnique({ where: { email } });
  }

  getSearchConditions(search) {
    return [
      { username: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } }
    ];
  }

  validateCreateData(data) {
    const { username, email, role, password_hash } = data;
    if (!username || typeof username !== 'string') {
      throw new Error('Invalid or missing username');
    }
    if (!email || !this.isValidEmail(email)) {
      throw new Error('Invalid or missing email');
    }

    if (role) {
      if (typeof role !== 'string' || !['superadmin', 'admin', 'user'].includes(role)) {
        throw new Error('Invalid role');
      }
    }

    if (!password_hash || typeof password_hash !== 'string' || password_hash.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    // Ensure password has at least one uppercase letter, one symbol, and one number
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/.test(password_hash)) {
      throw new Error('Password must include at least one uppercase letter, one symbol, and one number');
    }
  }

  validateUpdateData(data) {
    const { username, email, password_hash, role, is_active } = data;

    if (username && typeof username !== 'string') {
      throw new Error('Invalid username');
    }
    
    if (email && !this.isValidEmail(email)) {
      throw new Error('Invalid email');
    }

    if (password_hash && typeof password_hash === 'string' && password_hash.length >= 6) {
      // Ensure password has at least one uppercase letter, one symbol, and one number
      if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/.test(password_hash)) {
        throw new Error('Password must include at least one uppercase letter, one symbol, and one number');
      }
    }

    if (is_active !== undefined) {
      if (typeof is_active !== 'boolean' || !['true', 'false'].includes(is_active)) {
        throw new Error('Invalid is_active');
      }
    }

    if (role) {
      if (typeof role !== 'string' || !['superadmin', 'admin', 'user'].includes(role)) {
        throw new Error('Invalid role');
      }
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default new UserRepository();