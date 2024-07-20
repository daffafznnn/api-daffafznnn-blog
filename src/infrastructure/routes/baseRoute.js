import BaseRouter from '../../router/index.js';
import userRoutes from '../../app/base/users/routes/userRoutes.js';
// Import rute lain sesuai kebutuhan
// import authRoutes from '../../app/base/auth/routes/authRoutes.js';

const baseRouter = new BaseRouter();

const routes = [
  { path: '/users', handler: userRoutes },
  // Tambahkan rute lainnya di sini
  // { path: '/auth', handler: authRoutes },
];

// Mendaftarkan rute dengan BaseRouter
baseRouter.registerRoutes(routes);

export default baseRouter.getRouter();
