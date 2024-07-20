import userService from '../services/userService.js';

class UserProcessor {
  async processRequest(method, ...params) {
    switch (method) {
      case 'getAll':
        return await userService.getAll(...params);
      case 'getById':
        return await userService.getById(...params);
      case 'create':
        return await userService.create(...params);
      case 'update':
        return await userService.update(...params);
      case 'delete':
        return await userService.delete(...params);
      default:
        if (typeof userService[method] === 'function') {
          return await userService[method](...params);
        } else {
          throw new Error(`Unknown method: ${method}`);
        }
    }
  }
}

export default new UserProcessor();