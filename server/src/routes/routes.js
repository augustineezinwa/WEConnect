import express from 'express';
import BusinessRouter from './BusinessRoutes';
import UserRouter from './UserRoutes';

const router = express.Router();
router.use(UserRouter);
router.use(BusinessRouter);

export default router;
