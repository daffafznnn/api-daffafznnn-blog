import { response } from "express";
import userProcessor from "../Processors/userProcessor.js";

class UserController {
  async getAll(req, res) {
    try {
      const response = await userProcessor.processRequest('getAll', req.query);
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
      const response = await userProcessor.processRequest('getById', req.params.id);
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
      const response = await userProcessor.processRequest('create', req.body);
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
      const response = await userProcessor.processRequest('update', req.params.id, req.body);
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
      const response = await userProcessor.processRequest('delete', req.params.id);
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

  // Universal custom method handler
  async processCustomMethod(req, res) {
    const { method } = req.params;
    try {
      const response = await userProcessor.processRequest(method, req.body);
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
          message: error.message || `Error processing method ${method}`,
        },
      });
    }
  }
}

export default new UserController();