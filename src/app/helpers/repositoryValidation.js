class validationRepository {
    validateData(action, data) {
    const fields = this.fields[action];

    for (const [key, config] of Object.entries(fields)) {
      if (config.required && !(key in data)) {
        throw new Error(`Missing required field: ${key}`);
      }

      if (key in data) {
        if (typeof data[key] !== config.type) {
          throw new Error(`Invalid type for field: ${key}`);
        }

        if (config.validate && !config.validate(data[key])) {
          throw new Error(`Invalid value for field: ${key}`);
        }
      }
    }
    }
  
    isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

    validatePassword(password) {
      return typeof password === 'string' &&
        password.length >= 6 &&
        /(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/.test(password);
    }
  
    validateRole(role) {
    return typeof role === 'string' && ['superadmin', 'admin', 'user'].includes(role);
  }
}

export default new validationRepository();