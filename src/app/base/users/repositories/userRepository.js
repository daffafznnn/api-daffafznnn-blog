import BaseRepository from "../../../common/baseRepository.js";
import repositoryValidation from "../../../helpers/repositoryValidation.js";

class UserRepository extends BaseRepository {
  constructor() {
    super('user');

    // Custom validators
    this.isValidEmail = repositoryValidation.isValidEmail;
    this.validatePassword = repositoryValidation.validatePassword;
    this.validateRole = repositoryValidation.validateRole;

    // Field configurations
    this.fields = {
      create: {
        username: { required: true, type: 'string' },
        email: { required: true, type: 'string', validate: this.isValidEmail },
        password_hash: { required: true, type: 'string', validate: this.validatePassword },
        role: { type: 'string', required: true, validate: this.validateRole }
      },
      update: {
        username: { type: 'string' },
        email: { type: 'string', validate: this.isValidEmail },
        password_hash: { type: 'string', validate: this.validatePassword },
        is_active: { type: 'boolean' },
        role: { type: 'string', validate: this.validateRole }
      },
      custom: {
        // Define custom methods and their fields here
        getByEmail: { email: { required: true, type: 'string', validate: this.isValidEmail } }
      }
    };
  }

  async create(data) {
    this.validateData('create', data);
    return super.create(data);
  }

  async update(id, data) {
    this.validateData('update', data);
    return super.update(id, data);
  }

  // Custom methods
  async getByEmail(email) {
    this.validateData('custom', { email });
    return this.model.findUnique({ where: { email } });
  }
}

export default new UserRepository();