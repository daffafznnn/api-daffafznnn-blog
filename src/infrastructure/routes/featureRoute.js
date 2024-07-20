import BaseRouter from '../../router/index.js';
// Import feature routes
// import blogRoutes from '../../app/features/blogs/routes/blogRoutes.js';

const featureRouter = new BaseRouter();

const routes = [
  // { path: '/blogs', handler: blogRoutes },
  // Add more feature routes here
];

featureRouter.registerRoutes(routes);

export default featureRouter.getRouter();
