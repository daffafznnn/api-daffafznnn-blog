import express from 'express';
// import authRoutes from '../app/Base/Auth/routes.js';
import userRoutes from '../../app/base/users/routes/userRoutes.js';

const router = express.Router();

// router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
