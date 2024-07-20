import express from 'express';
import UserController from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.get('/', UserController.getAll);
userRoutes.get('/:id', UserController.getById);
userRoutes.post('/', UserController.create);
userRoutes.put('/:id', UserController.update);
userRoutes.delete('/:id', UserController.delete);

export default userRoutes;