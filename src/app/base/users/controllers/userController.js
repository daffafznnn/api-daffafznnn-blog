import UserService from '../services/userService.js';

class UserController {
  async getAll(req, res) {
    try {
      const response = await UserService.getAll();
      return res.status(200).json({
        success: true,
        payload: response.data,
        message: response.message
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        payload: null,
        error: {
          code: error.statusCode || 500,
          message: error.message || "Error retrieving users",
        },
      });
    }
  }

  async getById(req, res) {
    try {
      const response = await UserService.getById(req.params.id);
      return res.status(200).json({
        success: true,
        payload: response.data,
        message: response.message
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        payload: null,
        error: {
          code: error.statusCode || 500,
          message: error.message || "Error retrieving user",
        },
      });
    }
  }

  async create(req, res) {
    try {
      const response = await UserService.create(req.body);
      return res.status(201).json({
        success: true,
        payload: response.data,
        message: response.message
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        payload: null,
        error: {
          code: error.statusCode || 500,
          message: error.message || "Error creating user",
        },
      });
    }
  }

  async update(req, res) {
    try {
      const response = await UserService.update(req.params.id, req.body);
      return res.status(200).json({
        success: true,
        payload: response.data,
        message: response.message
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        payload: null,
        error: {
          code: error.statusCode || 500,
          message: error.message || "Error updating user",
        },
      });
    }
  }

  async delete(req, res) {
    try {
      const response = await UserService.delete(req.params.id);
      return res.status(200).json({
        success: true,
        payload: response.data,
        message: response.message
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        payload: null,
        error: {
          code: error.statusCode || 500,
          message: error.message || "Error deleting user",
        },
      });
    }
  }
}

export default new UserController();