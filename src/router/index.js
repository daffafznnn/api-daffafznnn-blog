import express from 'express';

class BaseRouter {
  constructor() {
    this.router = express.Router();
  }

  // Metode untuk mendaftarkan rute dengan parameter
  registerRoutes(routes) {
    routes.forEach(({ path, handler }) => {
      this.router.use(path, handler);
    });
  }

  // Mendapatkan router yang sudah diatur
  getRouter() {
    return this.router;
  }
}

export default BaseRouter;