import express from 'express';
import userDataController from '../controllers/userData.js'

const userDataRoutes = express.Router();

userDataRoutes.post('/register', userDataController.register);
userDataRoutes.get('/usersdata', userDataController.get);

export default userDataRoutes;
