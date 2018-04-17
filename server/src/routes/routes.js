import express from 'express';
import businessRouter from './BusinessRoutes';
import UserRouter from './UserRoutes';

const router = express.Router();
router.use(UserRouter);
router.use(businessRouter);

export default router;
